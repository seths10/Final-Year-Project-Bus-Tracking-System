# Manual - Configuration of LoRaWAN gateway and end node devices

## Configuration of the Gateway

### Step A. Install ChirpStack Gateway Bridge 

1. Upgrade the Raspberry Pi packages.
 ``` bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```

2. ChirpStack Gateway Bridge makes use of MQTT for publishing and receiving application payloads.
```bash
   Type: sudo apt-get install mosquitto -y
   Type: sudo apt-get install mosquitto-clients -y
```
#### Note:
   Start mosquitto on boot.
```bash
    sudo systemctl enable mosquitto
```
   To disable mosquitto so it doesn't start on boot.
```bash
 sudo systemctl disable mosquitto
```
3. ChirpStack provides pre-compiled binaries packaged as Debian (.deb) packages.
   In order to activate this repository, execute the following commands:
```bash 
sudo apt install apt-transport-https dirmngr -y
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1CE2AFD36DBCCA00 
sudo echo "deb https://artifacts.chirpstack.io/packages/3.x/deb stable main" | sudo tee /etc/apt/sources.list.d/chirpsstack.list
sudo apt-get update
```
   
5. Install the ChirpStack Gateway Bridge.
```bash
 sudo apt-get install chirpstack-gateway-bridge
```
#### Note 1:
   This will setup an user and group, create start scripts for systemd or init.d
   (this depends on your version of Debian / Ubuntu).
#### Note 2:
   chirpstack-gateway-bridge configuration file is installed at:
   /etc/chirpstack-gateway-bridge/chirpstack-gateway-bridge.toml
   chirpstack-gateway-bridge executable is installed at: 
   /usr/bin/chirpstack-gateway-bridge
####   Note 3:
   More information: /usr/bin/chirpstack-gateway-bridge --help
#### Note 4:
   Start:
 ```bash 
   sudo systemctl start chirpstack-gateway-bridge
  ```
   Restart:
```bash   
   sudo systemctl restart chirpstack-gateway-bridge
```   
   Stop:
```bash 
sudo systemctl stop chirpstack-gateway-bridge
```
   Display logs:
 ```bash 
   sudo journalctl -f -n 100 -u chirpstack-gateway-bridge
```

6. Modify the ChirpStack Gateway Bridge configuration file:
   /etc/chirpstack-gateway-bridge/chirpstack-gateway-bridge.toml.
```bash   
   sudo su
   cd /etc/chirpstack-gateway-bridge
   nano chirpstack-gateway-bridge.toml
```
   [general]
```
   # debug=5, info=4, warning=3, error=2, fatal=1, panic=0

   log_level=4

   # Gateway backend configuration.

   [backend]
   type="semtech_udp"

   # Semtech UDP packet-forwarder backend.

   [backend.semtech_udp]
   udp_bind = "0.0.0.0:1700"
```
6. Start ChirpStack Gateway Bridge.
```bash
   sudo systemctl start chirpstack-gateway-bridge
```
   If your distribution uses systemd or init.d, use one of the following commands:
####   Note: Raspberry Pi uses systemd.
   [systemd] 
``` bash 
sudo systemctl [start|stop|restart|status] chirpstack-gateway-bridge
```
   [init.d] 
   ```bash
    sudo /etc/init.d/chirpstack-gateway-bridge [start|stop|restart|status]
```

8. Verify if the ChirpStack Gateway Bridge is running and check if there are no errors.
```bash 
systemctl status chirpstack-gateway-bridge
```
9. Check ChirpStack Gateway Bridge log output. 
[systemd] 
```bash
journalctl -f -n 50 -u chirpstack-gateway-bridge
```
   [init.d]
```bash
tail -f -n 50 /var/log/chirpstack-gateway-bridge/chirpstack-gateway-bridge.log
```
10. Start chirpstack-gateway-bridge on boot.
```bash
   Type: sudo systemctl enable chirpstack-gateway-bridge
```
####   Note:
   To disable the ChirpStack Gateway Bridge so it doesn't start on boot.
```bash
   sudo systemctl disable chirpstack-gateway-bridge
```
### Step B Install ChirpStack Network Server

1. Install PostgreSQL.
```bash
sudo apt-get install postgresql -y
```
2. Install Redis server and Redis tools.
```bash 
sudo apt-get install redis-server -y
sudo apt-get install redis-tools -y
```
3. ChirpStack Network Server needs its own database.
   To create a new database, start the PostgreSQL prompt as the postgres user.
```bash
sudo -u postgres psql
```
4. Within the PostgreSQL prompt, enter the following queries:
```bash
create role chirpstack_ns with login password 'dbpassword';
```
####   Note: The database password is: 'dbpassword'
#####   Change this to something more secure.
```bash
 create database chirpstack_ns with owner chirpstack_ns;
```

5. Enable the pg_trgm (trigram) and hstore extensions.
```bash
 \c chirpstack_ns
 create extension pg_trgm;
 create extension hstore;
 \q
```
6. Verify if the user and database have been setup correctly, try to connect to it:
```bash
psql -h localhost -U chirpstack_ns -W chirpstack_ns
\q
```

7. Install ChirpStack Network Server.
```bash
sudo apt-get install chirpstack-network-server -y
````
#### Note 1:
   ChirpStack Network Server configuration file is installed at:
   /etc/chirpstack-network-server/chirpstack-network-server.toml
   ChirpStack Network Server executable is installed at: /usr/bin/chirpstack-network-server
#### Note 2:
   More information: /usr/bin/chirpstack-network-server --help
####  Note 3:
   Start:
   ```bash
   sudo systemctl start chirpstack-network-server
   ```
   Restart:
   ```bash
   sudo systemctl restart chirpstack-network-server
   ```
   Stop:
   ```bash
   systemctl stop chirpstack-network-server
   ```
   Display logs:
   ```bash
   sudo journalctl -f -n 100 -u chirpstack-network-server
```
8. Modify the ChirpStack Network Server configuration file /etc/chirpstack-network-server/chirpstack-network-server.toml.
```bash
sudo su
cd /etc/chirpstack-network-server
nano chirpstack-network-server.toml
```
   Make the following changes, EU868 configuration example.
   For other examples: https://www.chirpstack.io/guides/debian-ubuntu/

   [general]
```
   # debug=5, info=4, warning=3, error=2, fatal=1, panic=0

   log_level=4

   [postgresql]
   dsn="postgres://chirpstack_ns:dbpassword@localhost/chirpstack_ns?sslmode=disable"

   [network_server]
   net_id="000000"

   [network_server.band]
   name="EU_863_870"

   [[network_server.network_settings.extra_channels]]
   frequency=867100000
   min_dr=0
   max_dr=5

   [[network_server.network_settings.extra_channels]]
   frequency=867300000
   min_dr=0
   max_dr=5

   [[network_server.network_settings.extra_channels]]
   frequency=867500000
   min_dr=0
   max_dr=5

   [[network_server.network_settings.extra_channels]]
   frequency=867700000
   min_dr=0
   max_dr=5

   [[network_server.network_settings.extra_channels]]
   frequency=867900000
   min_dr=0
   max_dr=5

   [network_server.gateway.backend.mqtt]
   server="tcp://localhost:1883"

   [metrics]
   timezone="Local"
````
####   Note 1: dsn
   Given you used the password dbpassword when creating the PostgreSQL database.
####   Note 2: name
   LoRaWAN regional band configuration. Valid values:
   AS_923
   AU_915_928
   CN_470_510
   CN_779_787
   EU_433
   EU_863_870
   IN_865_867
   KR_920_923
   RU_864_870
   US_902_928
####   Note 3: timezone
   The timezone is used. Example: "Europe/Amsterdam" or "Local" for the the system's local time zone.
####   Note 4: server
   MQTT broker address and port

   Type: exit (After changes)

9. Start ChirpStack Network Server.
```bash 
sudo systemctl start chirpstack-network-server
```
   If your distribution uses systemd or init.d, use one of the following commands:

####   Note: Raspberry Pi uses systemd.
   [systemd] 
 ```bash
 sudo systemctl [start|stop|restart|status] chirpstack-network-server
 ```
   [init.d]
   ```bash 
   sudo /etc/init.d/chirpstack-network-server [start|stop|restart|status]
```
10. Verify if the ChirpStack Network Server is running.
 ```bash
 systemctl status chirpstack-network-server
```
11. Check ChirpStack Network Server log output.
    [systemd]
 ```bash
 journalctl -f -n 50 -u chirpstack-network-server
 ```   
 [init.d]
 ```bash
 tail -f -n 50 /var/log/chirpstack-network-server/chirpstack-network-server.log
```
12. Start ChirpStack Network Server on boot.
```bash
sudo systemctl enable chirpstack-network-server
```
####    Note:
    To disable the ChirpStack Network Server so it doesn't start on boot.
```bash
 sudo systemctl disable chirpstack-network-server
```
### Step C. Install ChirpStack Application Server.

1. ChirpStack Application Server persists the gateway data into a PostgreSQL database.
   ChirpStack Application Server needs its own database.
   To create a new database, start the PostgreSQL prompt as the postgres user:
```bash
sudo -u postgres psql
```
2. Within the PostgreSQL prompt, enter the following queries:
```
create role chirpstack_as with login password 'dbpassword';
create database chirpstack_as with owner chirpstack_as;
```
3. Enable the pg_trgm (trigram) and hstore extensions.
```bash
\c chirpstack_as
create extension pg_trgm;
create extension hstore;
\q
```
4. Verify if the user and database have been setup correctly, try to connect to it:
```
psql -h localhost -U chirpstack_as -W chirpstack_as
 \q
````
5. Install ChirpStack Application Server.
   Type: sudo apt-get install chirpstack-application-server

####   Note 1:
   chirpstack-application-server configuration file is installed at:
   /etc/chirpstack-application-server/chirpstack-application-server.toml
   chirpstack-application-server executable is installed at: /usr/bin/chirpstack-application-server
#### Note 2:
   More information: /usr/bin/chirpstack-application-server --help
####   Note 3:
   Start:
```bash   
sudo systemctl start chirpstack-application-server
```
   Restart:
```bash
 sudo systemctl restart chirpstack-application-server
```
   Stop:
```bash
sudo systemctl stop chirpstack-application-server
```
   Display logs:
```bash
sudo journalctl -f -n 100 -u chirpstack-application-server
```
6. Create a JSON Web Token (jwt). Open a terminal.
```bash
openssl rand -base64 32
```
   For example: e3+eD7zcVFJF3EFpPnM1oMj02DqUZxt5wR4IfPBpbtA=
   Copy and save the output. Will be used at the next step. Keep this secret!

7. Modify the chirpstack-application-server configuration file.
   /etc/chirpstack-application-server/chirpstack-application-server.toml.
```bash
sudo su
cd /etc/chirpstack-application-server
nano chirpstack-application-server.toml
```
   Make the following changes (if needed):
   [general]
```
   # debug=5, info=4, warning=3, error=2, fatal=1, panic=0

   log_level=4

   [postgresql]
   dsn="postgres://chirpstack_as:dbpassword@localhost/chirpstack_as?sslmode=disable"

   [application_server.external_api]
   jwt_secret="e3+eD7zcVFJF3EFpPnM1oMj02DqUZxt5wR4IfPBpbtA="

   [application_server.integration.mqtt]
   server="tcp://localhost:1883"

   [application_server.api]
   public_host="localhost:8001"
```
####   Note 1: dsn
   Given you used the password dbpassword when creating the PostgreSQL database.
####   Note 2: jwt_secret
   jwt_secret, see step 6.
####   Note 3: server
   MQTT broker address and port
####   Note 4: public_host
   The Internal API Server is used by ChirpStack Network Server to communicate with ChirpStack Application Server

   Type: exit (After changes)

8. Start ChirpStack Application Server.
```bash
sudo systemctl start chirpstack-application-server
```
   If your distribution uses systemd or init.d, use one of the following commands:
####   Note: Raspberry Pi uses systemd.
   [systemd] 
```bash
sudo systemctl [start|stop|restart|status] chirpstack-application-server
```
   [init.d]
```bash 
   sudo /etc/init.d/chirpstack-application-server [start|stop|restart|status]
```
9. Verify if the ChirpStack Application Server is running.
```bash
systemctl status chirpstack-application-server
```
10. Check ChirpStack Application Server log output.
    [systemd]
 ```bash
 journalctl -f -n 50 -u chirpstack-application-server
 ````   
 [init.d] 
 ```bash
 tail -f -n 50 /var/log/chirpstack-application-server/chirpstack-application-server.log
```
11. Start ChirpStack Application Server on boot.
```bash
 sudo systemctl enable chirpstack-application-server
```
 #### Note:
    To disable the ChirpStack Application Server so it doesn't start on boot.
```bash
sudo systemctl disable chirpstack-application-server
```

## Step D. Modify ChirpStack Gateway Bridge configuration 

1. Modify the ChirpStack Gateway Bridge configuration file:
   /etc/chirpstack-gateway-bridge/chirpstack-gateway-bridge.toml.
```bash
sudo su
cd /etc/chirpstack-gateway-bridge
nano chirpstack-gateway-bridge.toml
```
   Make the following changes (if needed):
   server="tcp://127.0.0.1:1883"

####   Note: server
   MQTT broker address and port

   Type: exit (After changes)

### Step E. Modify Packet Forwarder configuration 

1. Modify the packet forwarder global_conf.json file.
   In the RAK831 Pilot Gateway this file can be found at:
   /opt/ttn-gateway/packet_forwarder/lora_pkt_fwd
```bash
cd /opt/ttn-gateway/packet_forwarder/lora_pkt_fwd
sudo nano global_conf.json
```
   Make the following changes (if needed):
```   
"serv_port_down": 1700,
"serv_port_up": 1700,
"server_address": "localhost",
```
####   Note:
#####   Originally the server_address was "router.eu.thethings.network".
   The gateway now sends UDP data to the ChirpStack Gateway Bridge.

2. Reboot the Gateway.
```bash
sudo reboot
```

### Step F. Check if all required services are running 
```bash
systemctl status ttn-gateway
systemctl status mosquitto
systemctl status chirpstack-gateway-bridge
systemctl status chirpstack-network-server
systemctl status chirpstack-application-server
```

==============================================================
## Application Server Web Interface

### Step G. ChirpStack Application Server Web Interface 

1. Open a web browser and enter the IP address where the ChirpStack Application Server is installed,
   followed by port 8080. In this manual the ChirpStack Application Server is installed on the Gateway.
   For example: http://192.168.1.71:8080

2. Login with the default credentials:
   user: admin
   password: admin

3. Select menu: Network-servers
   Press button: ADD
   Tab: GENERAL
   Network-server name: e.g, 'LoRaServer1'
   Network-server server: localhost:8000
   Note 1: Use localhost, if ChirpStack Network Server is installed on the same host as ChirpStack Application Server.
   Note 2: The ChirpStack Application Server can connect to multiple ChirpStack Network Server instances.
   \*\*\* In our case they are both on the same host therefore we go with Note 1

   Tab: GATEWAY DISCOVERY
   Uncheck: Enable gateway discovery

####   Note 3: In this manual I assume you only have one gateway.
   Therefore gateway discovery is disabled.

   Select: ADD NETWORK-SERVER or UPDATE NETWORK-SERVER

4. Select menu: Gateway-Profiles
   Nothing done
5. Select menu: Organizations
   Select: loraserver

   Change Organization name: e.g., 'IOT Devlab'
   The name may only contain words, numbers and dashes.

   Display name: eg. 'IoT devlab Org'

   Check: Organization can have gateways
   When checked, it means that organization administrators are able to add their own gateways to the network. Note that the usage of the gateways is not limited to this organization.

   Select: UPDATE ORGANIZATION

6. Select menu: Service-Profiles

   Note:
   A service-profile connects an organization to a network-server and defines the features that an organization can use on this network-server.

   Press button: CREATE

   Service-profile name: e.g, 'ServiceProfile1'
   A name to identify the service-profile.

   Network-server: 'LoRaServer1'
   The network-server on which this service-profile will be provisioned. After creating the service-profile, this value can't be changed.

   Check: Add gateway meta-data
   GW metadata (RSSI, SNR, GW geoloc., etc.) are added to the packet sent to the application-server.

   Uncheck: Enable network geolocation
   When enabled, the network-server will try to resolve the location of the devices under this service-profile. Please note that you need to have gateways supporting the fine-timestamp feature and that the network-server needs to be configured in order to provide geolocation support.

   Device-status request frequency: 0
   Frequency to initiate an End-Device status request (request/day). Set to 0 to disable.

   Minimum allowed data-rate: 0
   Minimum allowed data rate. Used for ADR. This applies for the EU.

   Maximum allowed data-rate: 5
   Maximum allowed data rate. Used for ADR. This applies for the EU.

   Select: CREATE SERVICE-PROFILE

7. Select menu: Device-Profiles

   Note:
   A device-profile defines the capabilities and boot parameters of a device. You can create multiple device-profiles for different kind of devices.

   Press button: CREATE

   Device-profile name: e.g, 'DEVPROF-EU868'
   A name to identify the device-profile.

   Network-server: LoRaServer1
   The network-server on which this device-profile will be provisioned.
   After creating the device-profile, this value can't be changed.

   LoRaWAN MAC version: 1.0.2
   The LoRaWAN MAC version supported by the device.
   I will use the Arduino LMIC Library when I upload my sketch (Step H).
   https://github.com/matthijskooijman/arduino-lmic

   The Arduino LMIC Library supports LoRaWAN MAC version 1.0.2 revision A
   See also:
   https://forum.chirpstack.io/t/generic-arduino-lmic-based-devices/2991

   LoRaWAN Regional Parameters revision: A
   Revision of the Regional Parameters specification supported by the device.

   MAX EIRP: 0

   Select: CREATE DEVICE-PROFILE

8. Select Device-profile: DeviceB
   Select tab: JOIN (OTAA/ABP)
   Check: Device supports OTAA
   Select tab: Class-B
   Uncheck: Device supports Class-B (I have disabled this because I have not done any testing with Class B before)
   Select tab: Class-C
   Uncheck: Device supports Class-C (I have disabled this because I have not done any testing with Class C before)

   Select: UPDATE DEVICE-PROFILE

9. Select menu: Gateways
   Press button: CREATE

   Gateway name: e.g., 'RAK831'
   The name may only contain words, numbers and dashes.

   Gateway description:e.g., 'RAK831 Pilot Gateway'

   Gateway ID:'B827EBFFFEC74B36'

   Note:
   The gateway ID can be found in the local_conf.json file.
   In the RAK831 Pilot Gateway this file can be found at:
   /opt/ttn-gateway/packet_forwarder/lora_pkt_fwd

   https://github.com/robertlie/RAK831-LoRaGateway-RPi/blob/master/configuration_files/local_conf.json#L3

   Network-server: LoRaServer1 -- the name you provided as the network server
   Select the network-server to which the gateway will connect. When no network-servers are available in the dropdown, make sure a service-profile exists for this organization.

   Gateway-Profile:
   An optional gateway-profile which can be assigned to a gateway. This configuration can be used to automatically re-configure the gateway when ChirpStack Gateway Bridge is configured so that it manages the packet-forwarder configuration.

   Uncheck: Gateway discovery enabled
   When enabled (and ChirpStack Network Server is configured with the gateway discover feature enabled), the gateway will send out periodical pings to test its coverage by other gateways in the same network.

   Gateway altitude (meters): 10
   When the gateway has an on-board GPS, this value will be set automatically when the network received statistics from the gateway.

   Gateway location: <drag the marker to the location of the gateway> Drag the marker to the location of the gateway. When the gateway has an on-board GPS, this value will be set automatically when the network receives statistics from the gateway.

   Select: CREATE GATEWAY

   Select menu: Applications
   Press button: CREATE

   Application name: e.g., 'AppB'
   The name may only contain words, numbers and dashes.

   Application description: e.g., 'AppB'

   Service-profile: ServiceProfile1
   The service-profile to which this application will be attached.
   Note that you can't change this value after the application has been created.

   Payload codec: Custom Javascript codec functions
   By defining a payload codec, ChirpStack Application Server can encode and decode the binary device payload for you.

   Enter the following:

```javascript
   // Decode decodes an array of bytes into an object.
   // - fPort contains the LoRaWAN fPort number
   // - bytes is an array of bytes, e.g. [225, 230, 255, 0]
   // The function must return an object, e.g. {"location": 22.5}

   function Decode(fPort, bytes) {
   var lat_coord = bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3];
   var lat = lat_coord / 1000000 - 90;

   var lon_coord = bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7];
   var lon = lon_coord / 1000000 - 180;

   var alt = (bytes[8] << 8 | bytes[9]);
````
   Select: CREATE APPLICATION

   Select: App1
   Select tab: DEVICES
   Press button: CREATE

   Device name: for example: TESTDEVICE1
   The name may only contain words, numbers and dashes.

   Device description: for example: TESTDEVICE1

   Device EUI: <generate_a_device_eui>
   Generate a new Device EUI. Make sure you select LSB!
   Copy the generated Device EUI, you will need it in step H.
   For example: c6 50 16 27 67 60 64 11 (LSB)
   This is the same as "DEVEUI" in the Arduino sketch.

   Device-profile: DEVPROF-EU868

   Check: Disable frame-counter validation
   Note that disabling the frame-counter validation will compromise security as it enables people to perform replay-attacks.

   Select tab: KEYS (OTAA)

   Application key (LoRaWAN 1.0): <generate_an_application_key>
   Generate a new Application Key. Make sure you select MSB!
   Copy the generated Application Key, you will need it in step H.
   For example: eb f3 a6 6d 69 66 6b 31 e2 5f 9a 13 29 44 6b 4a (MSB)
   This is the same as "APPKEY" in the Arduino sketch.

   Press button: SET DEVICE-KEYS

### Step H. Modify and upload a sketch to the end node.


======================================================
## End Device Configuration with Arduino

### the code can be found in /devices/end-device(node)/node.ino

### Modify the Sketch

    Change the DEVEUI. Enter the Device EUI from previous step!
    static const u1_t PROGMEM DEVEUI[8]={ 0xC6, 0x50, 0x16, 0x27, 0x67, 0x60, 0x64, 0x11 };

    Change the APPKEY. Enter the Application Key from previous step!
    static const u1_t PROGMEM APPKEY[16] = { 0xEB, 0xF3, 0xA6, 0x6D, 0x69, 0x66, 0x6B, 0x31, 0xE2, 0x5F, 0x9A, 0x13, 0x29, 0x44, 0x6B, 0x4A };

    LoRaServer does not use the APPEUI value.
    You can use any value, for example:
    static const u1_t PROGMEM APPEUI[8]={ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };

### In the Arduino LMIC ( by MCCI Catena ) modify the region parameters

#### comment out the the 'lmic_project_config' file

    This file can be located in the arduino folder found on your pc
    For me:
    Documents/Arduino/libraries/MCCI_LoRaWAN_LMIC_library/project_config/

    Make Sure the file is exactly like this

    // project-specific definitions
    #define CFG_eu868 1
    //#define CFG_us915 1
    //#define CFG_au915 1
    //#define CFG_as923 1
    // #define LMIC_COUNTRY_CODE LMIC_COUNTRY_CODE_JP      /* for as923-JP; also define CFG_as923 */
    //#define CFG_kr920 1
    //#define CFG_in866 1
    #define CFG_sx1276_radio 1
    //#define LMIC_USE_INTERRUPTS
    #define hal_init


    For reference visit: https://www.aeq-web.com/ttgo-lilygo-esp32-gps-lora-board-lmic-otta-source-code/

### Testing

Step I. Check if sensor data is displayed in the ChirpStack Application Server web interface.
Login
Select menu: Applications
Select: AppB
Select Device: TESTDEVICE1
Select menu: LIVE DEVICE DATA

### Errors

Step J. Check the chirpstack-gateway-bridge, chirpstack-network-server and chirpstack-application-server for errors.
This step is only needed if you encounter problems.
Check if packet forwarder sends data:
```bash
sudo tcpdump -AUq -i lo port 1700
journalctl -f -n 50 -u chirpstack-gateway-bridge
journalctl -f -n 50 -u chirpstack-network-server
journalctl -f -n 50 -u chirpstack-application-server
```
More troubleshooting:
https://www.chirpstack.io/guides/troubleshooting/gateway/
