function cold () {
    for (let index = 0; index <= 7; index++) {
        range2.setPixelColor(index, neopixel.colors(NeoPixelColors.White))
        range2.show()
        basic.pause(200)
    }
    while (light2 == 2) {
        range1.showRainbow(0, 179)
        range2.showRainbow(180, 310)
        touch_sensor1 = pins.analogReadPin(AnalogPin.P4)
        if (touch_sensor1 > 170) {
            range2.showColor(neopixel.colors(NeoPixelColors.Black))
            basic.pause(200)
            break;
        }
        pressure_sensor = pins.analogReadPin(AnalogPin.P3)
        if (pressure_sensor > 450) {
            basic.pause(200)
            break;
        }
    }
}
function off () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    basic.pause(100)
}
function warm () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    for (let index = 0; index <= 7; index++) {
        range1.setPixelColor(index, neopixel.colors(NeoPixelColors.White))
        range1.show()
        basic.pause(200)
    }
    while (light2 == 1) {
        range1.showRainbow(0, 179)
        touch_sensor2 = pins.analogReadPin(AnalogPin.P10)
        if (touch_sensor2 > 170) {
            basic.pause(200)
            break;
        }
        pressure_sensor = pins.analogReadPin(AnalogPin.P3)
        if (pressure_sensor > 450) {
            basic.pause(200)
            break;
        }
    }
}
function orange () {
    for (let index = 0; index <= 15; index++) {
        strip.setPixelColor(index, neopixel.colors(NeoPixelColors.Orange))
        strip.show()
        if (index == 15) {
            break;
        }
        basic.pause(200)
    }
    strip.showColor(neopixel.colors(NeoPixelColors.Orange))
    basic.pause(100)
}
let touch_sensor2 = 0
let pressure_sensor = 0
let touch_sensor1 = 0
let range2: neopixel.Strip = null
let range1: neopixel.Strip = null
let strip: neopixel.Strip = null
let light2 = 0
light2 = 0
let mode = 0
strip = neopixel.create(DigitalPin.P16, 16, NeoPixelMode.RGB)
range1 = strip.range(0, 8)
range2 = strip.range(8, 8)
strip.setBrightness(150)
range1.setBrightness(150)
range2.setBrightness(150)
basic.pause(100)
basic.forever(function () {
    pressure_sensor = pins.analogReadPin(AnalogPin.P3)
    touch_sensor1 = pins.analogReadPin(AnalogPin.P4)
    touch_sensor2 = pins.analogReadPin(AnalogPin.P10)
    serial.writeNumber(pressure_sensor)
    serial.writeNumber(touch_sensor1)
    serial.writeNumber(touch_sensor2)
    serial.writeLine("")
    if (mode == 0) {
        off()
    }
    if (mode == 0 && (pressure_sensor > 200 && pressure_sensor < 450)) {
        orange()
        mode += 1
    }
    if (mode == 1 && (pressure_sensor < 200 && (touch_sensor1 < 170 && touch_sensor2 < 170))) {
        orange()
    }
    if (mode == 1 && touch_sensor1 > 170) {
        light2 = 1
        warm()
    }
    if (mode == 1 && touch_sensor2 > 170) {
        light2 += 1
        cold()
    }
    if (mode == 1 && pressure_sensor > 450) {
        off()
        mode += 1
        light2 = 0
    }
    if (mode == 2 && pressure_sensor < 450) {
        off()
        mode = 0
        light2 = 0
    }
})
