from PIL import Image
from pillow_heif import register_heif_opener
import os

# Register HEIF opener
register_heif_opener()

images_dir = "assets/images"

# List of HEIC files to convert
heic_files = [
    "IMG_0607.HEIC",
    "IMG_0608.HEIC",
    "IMG_0745.HEIC",
    "IMG_5498.HEIC"
]

for heic_file in heic_files:
    input_path = os.path.join(images_dir, heic_file)
    output_path = os.path.join(images_dir, heic_file.replace(".HEIC", ".jpg"))
    
    try:
        img = Image.open(input_path)
        # Convert to RGB (in case of RGBA)
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGB")
        img.save(output_path, "JPEG", quality=85)
        print(f"Converted: {heic_file} -> {os.path.basename(output_path)}")
    except Exception as e:
        print(f"Error converting {heic_file}: {e}")

print("Conversion complete!")
