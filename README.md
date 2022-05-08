# minifyurl
A service for creating small urls from large ones

This service is using dynamoDb, mongodb as database, nodejs (express) as backend, and nextjs as frontend
Dynamodb is used for redirecting url to orginal link. It is used because of its high performance.
MongoDB is used for generating content like graphs for clients like the total clicks and its distribution among clicks.
nextjs is used as frontend because it uses react and having SEO optimization.

For running the project install the dependencies in individual folder using yarn.
Also there are some environmental variables you need to set for successfully running the project like AWS keys, mongodb database url

if you are running it locally
download dynamodb database from https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
and dynamodb url of local
first run the dynamodb database
you can use yarn dev for running the individual folder.
dockerfiles is not updated properly. sorry for that

Preview images

