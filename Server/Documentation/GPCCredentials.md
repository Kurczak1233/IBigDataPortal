In case you have accidentally pushed key and need to rotate it:

Github actions does not consume the gcp as it is in the file.
You have to manually remove ALL \n from the key if you want to make it work for production.
Remember that secrets should not contain "" inside. 
There may be an empty sign (" ") at the end. Remember to delete it.