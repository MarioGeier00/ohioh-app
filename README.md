# OHIOH App
This app is created to fight against the COVID-19 virus.

It uses tracking technologies (GPS and Bluetooth) and also QR-Code
to achieve warning the user about a possible infection.

### Running Prototype of this app
https://ohioh.azurewebsites.net/
This app should be installed on a mobile device.
Try it out on your mobile android device for free:
https://ohioh.azurewebsites.net/ohiohApp.apk

### Current working features
To test all features, please download the android app!
This app is currently in developement.
This app is not connected to any Backend yet.
No personal data is beeing sent.
The capture and the storage on the phone of GPS data is working.
To see the captured data, developer mode* has to be activated.
QR-Codes can be created (web app + mobile app) and scanned on a mobile device.
Generated QR-Codes can be shared.

### Homepage of the OHIOH Team
https://ohioh.de/
contact: kontakt@ohioh.de

### Used Frameworks
* Ionic with Angular
* Capacitor for Android and IOs Deployment

### Developers
Frontend Developement by Mario Geier and Jnnk

### Documentation
#### Project Structure
`add-location`: User is able to manually type where and when he spent time
`credits`: Overview of the team, imprint and AGBs
`data-protection`: Settings for choosing which data source should be used for tracking
`geolocation-test`: List of recorded gps data (available by enabling developer mode*)
`home`: Main page with status display
`infection-warning`: Info page for the user to tell him he might be infected
`qr-generator`: Page to generate and share an ohioh qr code
`qr-scanner`: Page to scan ohioh qr code and add the containing data to the tracking data
`settings`: Change data storage duration and language
`shared`: Services and shared UI components
`user-data`: User for the input of user data like name, age, residence, etc.
`welcome`: App introduction tour
`app-component`: main menu

#### *Developer Mode
Can be activated by tapping more than five times at the bottom area of the credits page (called "Impressum")

### MIT License

Copyright (c) 2020 Tjark Ziehm for OHIOH.de



Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.
