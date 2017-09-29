#Invoice Ninja Uploader
This is an terminal based data uploader for the Invoice Ninja application at
https://www.invoiceninja.com/ and allow a user to send information to the Invoice Ninja API 
through from a CSV.

I am in no way affiliated with the Invoice Ninja company, I only created this tool to
for easier migration of data from one accounting system to another. 

##Getting Started

First, create a .env file and app.log file at the root of the directory.

In the .env file you will need to specify the following ENV variables:
* INVOICE_NINJA_API_KEY
* INVOICE_NINJA_API_URL

Then you can run `npm start`

The command line will prompt you to select from the following options for uploading:
* clients
* invoices
* payments
* refunds
* credits

Then you will be asked to select the location of the file were your data lives.
I have found it to be best to move the .csv file to the root of my directory and
then simply enter the name of the file, for example: `test_clients.csv`. 

Once you have entered the name and pressed `Enter`, the upload process will begin
and you will see an output for each row in your csv.

#FYI Important Information
This assumes that you are using the hosted version of Invoice Ninja so that your 
API calls are not limited. If you are using the paid hosted version of Invoice Ninja
you will be limited to 100 API calls per hour.


#Data Mapping
Data mapping examples will go here for future reference.

#Information about future plans.
In the future I hope to implement the following features:
* Output to logs when errors occur.
* Automatically looking up clients based on given information.
