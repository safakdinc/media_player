use std::fs::File;
use std::io::Write;
use id3::{ Tag, TagLike };
use serde::Serialize;

#[derive(Serialize)]
struct PictureData {
    mime_type: String,
    data: Vec<u8>,
}

#[derive(Serialize)]
pub struct FileData {
    title: Option<String>,
    album: Option<String>,
    artist: Option<String>,
    picture: Option<PictureData>,
}

pub fn get_file_data(path: String) -> Result<FileData, Box<dyn std::error::Error>> {
    let tag = Tag::read_from_path(path)?;
    let mut audio_data: FileData = FileData {
        title: None,
        artist: None,
        album: None,
        picture: None,
    };

    if let Some(artist) = tag.artist() {
        audio_data.artist = Some(artist.to_owned());
        println!("artist: {}", artist);
    }
    if let Some(title) = tag.title() {
        audio_data.title = Some(title.to_owned());
        println!("title: {}", title);
    }
    if let Some(album) = tag.album() {
        audio_data.album = Some(album.to_owned());
        println!("album: {}", album);
    }
    if let Some(picture) = tag.pictures().next() {
        let image_data = picture.data.to_vec();
        let image_format = match picture.mime_type.as_str() {
            "image/jpeg" => "jpg",
            "image/png" => "png",
            "image/gif" => "gif",
            _ => {
                println!("Unsupported image format");
                "unsupported format"
            }
        };
        let image_path = "../image.jpg.".to_owned() + image_format;
        let mut image_file = File::create(&image_path).expect("Failed to create image file");
        image_file.write_all(&image_data).expect("Failed to write image data");
        let picture_data = PictureData {
            data: image_data,
            mime_type: image_format.to_owned(),
        };
        audio_data.picture = Some(picture_data);
        println!("Album artwork saved to: {}", image_path);
    } else {
        println!("No album artwork found");
    }

    Ok(audio_data)
}
