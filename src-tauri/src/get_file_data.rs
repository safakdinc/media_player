use std::path::Path;
use std::fs::File;
use std::io::{ Error, ErrorKind, Write };
use audiotags::{ Tag, Picture, Album, MimeType };
use serde::{ Deserialize, Serialize };

#[derive(Serialize)]
pub struct FileData<'a> {
    title: Option<String>,
    album: Option<Album<'a>>,
    author: Option<String>,
    cover: Picture<'a>,
}

pub fn get_file_data(file_path: String) -> Result<FileData<'static>, Error> {
    let path = Path::new(&file_path);
    let cover = Picture {
        mime_type: MimeType::Jpeg,
        data: &vec![0u8; 10],
    };

    if path.is_file() {
        let tag = Tag::new().read_from_path(&file_path).unwrap();

        let album = tag.album();
        let author = tag.artist().map(|s| s.to_string());
        let title = tag.title().map(|s| s.to_string());
        //Ok(file_data)
        let mut file_data = FileData {
            title: title,
            album: album,
            author: author,
            cover: cover,
        };
        Ok(file_data)
    } else {
        Err(Error::new(ErrorKind::NotFound, "File not found"))
    }
}
