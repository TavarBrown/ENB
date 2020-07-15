// scrolltext demo for Adafruit RGBmatrixPanel library.
// Demonstrates double-buffered animation on our 16x32 RGB LED matrix:
// http://www.adafruit.com/products/420

// Written by Limor Fried/Ladyada & Phil Burgess/PaintYourDragon
// for Adafruit Industries.
// BSD license, all text above must be included in any redistribution.

#include <RGBmatrixPanel.h>
//#include <SoftwareSerial.h>
// Most of the signal pins are configurable, but the CLK pin has some
// special constraints.  On 8-bit AVR boards it must be on PORTB...
// Pin 8 works on the Arduino Uno & compatibles (e.g. Adafruit Metro),
// Pin 11 works on the Arduino Mega.  On 32-bit SAMD boards it must be
// on the same PORT as the RGB data pins (D2-D7)...
// Pin 8 works on the Adafruit Metro M0 or Arduino Zero,
// Pin A4 works on the Adafruit Metro M4 (if using the Adafruit RGB
// Matrix Shield, cut trace between CLK pads and run a wire to A4).

#define CLK  8   // USE THIS ON ARDUINO UNO, ADAFRUIT METRO M0, etc.
//#define CLK A4 // USE THIS ON METRO M4 (not M0)
//#define CLK 11 // USE THIS ON ARDUINO MEGA
#define OE   9
#define LAT 10
#define A   A0
#define B   A1
#define C   A2
#define D   A3
//SoftwareSerial programmer(18,19); //Rx,Tx for programmer 


// Last parameter = 'true' enables double-buffering, for flicker-free,
// buttery smooth animation.  Note that NOTHING WILL SHOW ON THE DISPLAY
// until the first call to swapBuffers().  This is normal.
RGBmatrixPanel matrix(A, B, C, D, CLK, LAT, OE, false);
// Double-buffered mode consumes nearly all the RAM available on the
// Arduino Uno -- only a handful of free bytes remain.  Even the
// following string needs to go in PROGMEM:

// Similar to F(), but for PROGMEM string pointers rather than literals
//#define F2(progmem_ptr) (const __FlashStringHelper *)progmem_ptr

String sendData(String command, const int timeout, boolean debug=true);
char message[] = "This is a notice";

String notice;


int16_t    textX         = matrix.width(),
           textMin       = sizeof(message) * -12,
           hue           = 0;

void setup() {

  Serial.begin(115200);

  sendData(F("AT+RST\r\n"), 10000);   //reset Serial
    //delay(1000);
    
    sendData(F("AT+CWMODE=1\r\n"), 10000); 
    //delay(1000);
    
    sendData(F("AT+CWJAP=\"CMCC-CHC9\",\"9dh6er5d\"\r\n"), 10000);

    sendData("AT+CIPSTART=\"TCP\",\"192.168.1.4\",5000\r\n", 5000);   //connect to server

    String id = "004";
    
    String url = String("GET /notices/") +id+ " HTTP/1.1\r\nHost: 192.168.1.4\r\nConnection: close\r\n\r\n";

    int bits = url.length(); 
    
    sendData(String("AT+CIPSEND=") +bits+ "\r\n",1000);    //tell server we are going to send data
//    
    notice = sendData(url,10000);     

    sendData(F("AT+CIPCLOSE\r\n"), 10000);   //close Serial
   
    int last_index = notice.lastIndexOf("body");
    notice.remove(0 , last_index+7);
    last_index = notice.lastIndexOf("startDate");
    notice.remove(last_index-3);
    //programmer.println(notice);   

 noInterrupts();

  matrix.begin();
  matrix.setTextWrap(false); // Allow text to run off right edge
  matrix.setTextSize(2);

  interrupts();
  
}

void loop() {
  byte i;

  // Clear background
  matrix.fillScreen(0);

 

  // Draw big scrolly text on top
  matrix.setCursor(textX, 1);
  matrix.print(message);

  // Move text left (w/wrap), increase hue
  if((--textX) < textMin) textX = matrix.width();
 
#if !defined(__AVR__)
  // On non-AVR boards, delay slightly so screen updates aren't too quick.
  delay(50);
#endif

  // Update display
  matrix.swapBuffers(false);
 //programmer.println("Update display");
}


String sendData(String command, const int timeout, boolean debug)
{
    String response = "";
    
    Serial.print(command); // send the read character to the Serial
    
    long int time = millis();
    
    while( (time+timeout) > millis())
    {
      while(Serial.available())
      {
        
        // The esp has data so display its output to the serial window 
        char c = Serial.read(); // read the next character.
        response+=c;
      }  
    }
    
    if(debug)
    {
      //programmer.print(response);
    
    }
    //noInterrupts();
    return response;
}
