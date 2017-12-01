#! /usr/bin/env node
require('console-stamp')(console, 'HH:MM:ss');
var config = {};
var fs = require('fs');
var argv = require('minimist')(process.argv);
var _config = (argv.config) ? argv.config : process.env.HOME + "/.config/usbmonitor";

if (!fs.existsSync(_config)){
  console.info("Config File not Found! (Looked at given path with Parameter --config or ~/.config/usbmonitor)");
  console.info("Starting in Info Mode only! Insert USB Device to generate UUID")
} else {
  config = require('ini').parse(fs.readFileSync(_config, 'utf-8'));
}

var usb   = require('usb-detection');
var exec  = require('child_process').exec;

usb.startMonitoring();
usb.on('add', function(device) {
  uuid = createUUID(device, function(uuid){
    if(config.hasOwnProperty(uuid))
      if(config[uuid].add)
        exec(config[uuid].add, function(err){if(err)console.error(err)});
  });
}).on('remove', function(device) {
  uuid = createUUID(device, function(uuid){
    if(config.hasOwnProperty(uuid))
      if(config[uuid].remove)
        exec(config[uuid].remove, function(err){if(err)console.error(err)});
  });
});

function createUUID(device, callback){
  var md5 = require('md5');
  uuid = md5(JSON.stringify({
    'vendorId'  : device.vendorId,
    'productId' : device.productId,
    'serial'    : (device.serial) ? (device.serial) : (device.serialNumber)
  }))
  console.log("Action detected on Device UUID => " , uuid);
  callback(uuid);
}
