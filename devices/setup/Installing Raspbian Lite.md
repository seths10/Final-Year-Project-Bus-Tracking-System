# DOWNLOAD RASPBIAN LITE

### • Download Raspbian Lite.
  Lite is a minimal version of the Raspbian image for the Raspberry Pi.
  The Lite version has only a command line interface (CLI) and no desktop or GUI of 
  any kind. This means fewer modules will load with the kernel thus less of the 
  Raspberry Pi’s resources are used.
  https://www.raspberrypi.org/downloads/raspbian/
### • After the Raspbian Lite is downloaded, verify the SHA256 checksum.
  The checksum is a hash number and is used to verify the integrity of the file.
  macOS: shasum -a 256 <file> 
  Linux: sha256sum <file>
  Windows 10: certutil -hashfile <file> SHA256

# WRITE IMAGE TO MICRO SD CARD
### • Download and install Pi Imager.
https://downloads.raspberrypi.org/imager/

Follow the instructions on their page to write the raspbian image onto the SD Card
make sure to enable ssh before writing the image to the SD card and also give a memorable password when doing so

You will need it to ssh into the pi for configuration
