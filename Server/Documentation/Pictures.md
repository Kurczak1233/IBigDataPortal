Images were initially downloaded from server and then they were displayed converted to base64 string.
This method involved a lot of time to get the file from the server than convert and display it.
The current method involves using the base url parameter which gets the file directly from server on GCP.

To use it please use file GUID as the last part of the concatenationed string using "storageBaseUrl.ts" content as a base. 