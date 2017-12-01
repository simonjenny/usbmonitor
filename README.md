# usbmonitor

usbmonitor is a cli tool to monitor usb ports for usb devices.
You can add hooks for insertion and removal of devices.

## Installation

You can install usbmonitor via npm:
`npm -g install https://github.com/simonjenny/usbmonitor.git`

## Configfile

usbmonitor looks for a config file in ~/.config/usbmonitor or the
file given at the --config command line parameter.

The file is in INI Format with a section for every USB Device you
want to monitor.

Example:
```
[01a7615ce0b57f6296e2ac2bbb84d593]
add=
remove=
```
You can create UUIDs by running usbmonitor in Info Mode (simply start usbmonitor with no config file)
