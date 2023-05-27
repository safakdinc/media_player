#![allow(dead_code)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod get_file_data;
use std::fs;
use std::{ fs::File, collections::VecDeque };
use bincode::{ serialize, deserialize };
use flate2::{ write::GzEncoder, read::GzDecoder };
use flate2::Compression;
use get_file_data::{ get_file_data, FileData };
use serde::{ Serialize, Deserialize };
use std::io::{ Write, Read };
use anyhow::{ Result, Context };
use chrono::{ DateTime, Local, serde::ts_seconds, Utc };
use std::path::Path;
use serde_json;
#[derive(Serialize, Deserialize)]
struct MediaEntry {
    file_path: String,
    #[serde(with = "ts_seconds")]
    last_played: DateTime<Utc>,
}

#[derive(Serialize, Deserialize)]
struct MediaTracker {
    media_list: VecDeque<MediaEntry>,
    max_entries: usize,
}

impl MediaTracker {
    fn new(max_entries: usize) -> Self {
        MediaTracker {
            media_list: VecDeque::new(),
            max_entries,
        }
    }

    fn add_media(&mut self, file_path: String) {
        let entry = MediaEntry {
            file_path,
            last_played: Local::now().with_timezone(&Utc),
        };

        if self.media_list.len() >= self.max_entries {
            self.media_list.pop_front();
        }

        self.media_list.push_back(entry);
    }

    fn print_media_list(&self) {
        for entry in &self.media_list {
            println!("File: {}, Last Played: {}", entry.file_path, entry.last_played);
        }
    }
}

fn get_current_timestamp() -> i64 {
    let local_time = Local::now();
    let unix_timestamp = local_time.timestamp();

    unix_timestamp
}

fn write_media_tracker_to_file(tracker: &MediaTracker, file_path: &str) -> Result<()> {
    let encoded = serialize(tracker).context("Failed to serialize tracker")?;

    let file = File::create(file_path).with_context(||
        format!("Failed to create file: {}", file_path)
    )?;
    let mut encoder = GzEncoder::new(file, Compression::default());
    encoder
        .write_all(&encoded)
        .with_context(|| format!("Failed to write encoded data to file: {}", file_path))?;

    Ok(())
}

fn read_media_tracker_from_file(
    file_path: &str
) -> Result<MediaTracker, Box<dyn std::error::Error>> {
    let file = File::open(file_path)?;
    let decoder = GzDecoder::new(file);
    let decoded: Vec<u8> = decoder.bytes().collect::<Result<_, _>>()?;

    let tracker = deserialize(&decoded)?;

    Ok(tracker)
}

//static LATEST_TRACK_PATH: String = String::from("../deneme.xcf");

#[tauri::command]
fn get_latest_tracks() -> Result<MediaTracker, String> {
    let LATEST_TRACK_PATH: String = String::from("../latest_tracks.conf");
    let file_exist = fs::metadata(LATEST_TRACK_PATH.clone()).is_ok();
    let file_tracker: MediaTracker;

    if file_exist {
        file_tracker = read_media_tracker_from_file(&LATEST_TRACK_PATH).map_err(|err|
            err.to_string()
        )?;
    } else {
        file_tracker = MediaTracker {
            max_entries: 30,
            media_list: VecDeque::new(),
        };
    }

    write_media_tracker_to_file(&file_tracker, &LATEST_TRACK_PATH).map_err(|err| err.to_string())?;
    // file_tracker.print_media_list();

    Ok(file_tracker)
}

#[tauri::command]
fn add_latest_tracks(path: String) -> Result<String, String> {
    let LATEST_TRACK_PATH: String = String::from("../latest_tracks.conf");
    let file_exist = fs::metadata(LATEST_TRACK_PATH.clone()).is_ok();
    let mut file_tracker: MediaTracker;

    if file_exist {
        file_tracker = read_media_tracker_from_file(&LATEST_TRACK_PATH).map_err(|err|
            err.to_string()
        )?;
    } else {
        file_tracker = MediaTracker {
            max_entries: 30,
            media_list: VecDeque::new(),
        };
    }

    file_tracker.add_media(path);
    write_media_tracker_to_file(&file_tracker, &LATEST_TRACK_PATH).map_err(|err| err.to_string())?;
    file_tracker.print_media_list();

    Ok(format!("Written, file => {}", &LATEST_TRACK_PATH))
}

#[tauri::command]
fn get_file(path: String) -> Result<String, String> {
    match get_file_data(path) {
        Ok(file_data) => { Ok(serde_json::to_string(&file_data).unwrap()) }
        Err(e) => { Err(e.to_string()) }
    }
}

// #[tauri::command]
// fn get_media(path: String) -> Result<String, String> {
//     let file_path = Path::new(path.to_string());
//     match Tag::new().read_from_path(file_path) {
//         Ok(tag) => {
//             if let Some(title) = tag.title() {
//                 println!("Title: {}", title);
//             }
//             if let Some(artist) = tag.artist() {
//                 println!("Artist: {}", artist);
//             }
//             if let Some(album) = tag.album() {
//                 println!("Album: {}", album);
//             }
//             // Extract other metadata fields as needed
//             println!("{:?}", tag);
//         }
//         Err(err) => {
//             eprintln!("Failed to read audio file metadata: {}", err);
//         }
//     }
//     Ok(())
// }

fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![get_latest_tracks, add_latest_tracks, get_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
