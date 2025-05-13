#!/usr/bin/env python3
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import os

# Create output directory if it doesn't exist
output_dir = "images/profile_variants"
os.makedirs(output_dir, exist_ok=True)

# Load the original image
original_image_path = "images/profile.png"
try:
    img = Image.open(original_image_path)
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
except Exception as e:
    print(f"Error loading image: {e}")
    exit(1)

# Website theme colors
colors = {
    "primary": (18, 196, 155),       # #12c49b
    "primary_dark": (0, 130, 130),   # #008282
    "accent": (0, 229, 255),         # #00E5FF
    "accent_dark": (0, 151, 178),    # #0097B2
    "bg_dark": (13, 13, 26),         # #0D0D1A
    "bg_light_dark": (26, 26, 46)    # #1A1A2E
}

# Function to apply color overlay
def apply_color_overlay(image, color, intensity=0.5):
    """Apply a color overlay to an image"""
    overlay = Image.new('RGBA', image.size, color + (int(255 * intensity),))
    return Image.alpha_composite(image, overlay)

# Function to apply duotone effect
def apply_duotone(image, dark_color, light_color):
    """Apply duotone effect to an image"""
    # Convert to grayscale
    grayscale = ImageOps.grayscale(image.convert('RGB'))
    
    # Create two solid color images
    dark_img = Image.new('RGB', image.size, dark_color)
    light_img = Image.new('RGB', image.size, light_color)
    
    # Apply the grayscale as a mask
    result = Image.composite(light_img, dark_img, grayscale)
    
    # Preserve original alpha
    if image.mode == 'RGBA':
        r, g, b = result.split()
        a = image.split()[3]
        result = Image.merge('RGBA', (r, g, b, a))
    
    return result

# Function to create a gradient overlay
def apply_gradient_overlay(image, color1, color2, direction='horizontal'):
    """Apply a gradient overlay to an image"""
    width, height = image.size
    gradient = Image.new('RGBA', image.size, (0, 0, 0, 0))
    
    for y in range(height):
        for x in range(width):
            if direction == 'horizontal':
                ratio = x / width
            else:  # vertical
                ratio = y / height
            
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            
            gradient.putpixel((x, y), (r, g, b, 100))  # Semi-transparent
    
    return Image.alpha_composite(image, gradient)

# Function to create a vignette effect
def apply_vignette(image, color, intensity=0.7):
    """Apply a vignette effect to an image"""
    width, height = image.size
    vignette = Image.new('RGBA', image.size, (0, 0, 0, 0))
    
    for y in range(height):
        for x in range(width):
            # Calculate distance from center (normalized)
            distance = ((x - width/2)**2 + (y - height/2)**2)**0.5
            max_distance = ((width/2)**2 + (height/2)**2)**0.5
            normalized_distance = distance / max_distance
            
            # Calculate alpha based on distance
            alpha = int(255 * min(1.0, normalized_distance * intensity))
            
            vignette.putpixel((x, y), color + (alpha,))
    
    return Image.alpha_composite(image, vignette)

# Create variants
variants = [
    {
        "name": "primary_overlay",
        "function": apply_color_overlay,
        "params": {"color": colors["primary"], "intensity": 0.3}
    },
    {
        "name": "accent_overlay",
        "function": apply_color_overlay,
        "params": {"color": colors["accent"], "intensity": 0.3}
    },
    {
        "name": "duotone_primary",
        "function": apply_duotone,
        "params": {"dark_color": colors["bg_dark"], "light_color": colors["primary"]}
    },
    {
        "name": "duotone_accent",
        "function": apply_duotone,
        "params": {"dark_color": colors["bg_dark"], "light_color": colors["accent"]}
    },
    {
        "name": "gradient_primary",
        "function": apply_gradient_overlay,
        "params": {"color1": colors["primary"], "color2": colors["primary_dark"]}
    },
    {
        "name": "gradient_accent",
        "function": apply_gradient_overlay,
        "params": {"color1": colors["accent"], "color2": colors["accent_dark"]}
    },
    {
        "name": "vignette_primary",
        "function": apply_vignette,
        "params": {"color": colors["primary"], "intensity": 0.8}
    },
    {
        "name": "vignette_accent",
        "function": apply_vignette,
        "params": {"color": colors["accent"], "intensity": 0.8}
    }
]

# Process and save each variant
for variant in variants:
    try:
        # Apply the effect
        processed_img = variant["function"](img.copy(), **variant["params"])
        
        # Save the result
        output_path = f"{output_dir}/profile_{variant['name']}.png"
        processed_img.save(output_path)
        print(f"Created {output_path}")
    except Exception as e:
        print(f"Error creating {variant['name']}: {e}")

print("\nAll variants created successfully!")
print(f"You can find them in the {output_dir} directory")