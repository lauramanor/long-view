# Making API Requests in Python

This tutorial has been adapted by Ms. Manor from a dataquest.io tutorial, [Python API Tutorial: Getting Started with APIs](https://www.dataquest.io/blog/python-api-tutorial/) and a Real Python article [Python’s Requests Library (Guide)](https://realpython.com/python-requests/). We will work together to explore some of these concepts, however these instructions are here for future reference. Be sure to include comments in notes in your `main.py` file as well!

## HTTP Requests


The Hypertext Transfer Protocol (HTTP) is designed to enable communications between clients and servers. HTTP works as a request-response protocol between a client and server.

Example: A client (browser) sends an HTTP request to the server; then the server returns a response to the client. The response contains status information about the request and may also contain the requested content.

[source: w3schools](https://www.w3schools.com/tags/ref_httpmethods.asp
)

HTTP methods include: 
- GET
- POST
- PUT
- HEAD
- DELETE
- PATCH
- OPTIONS
- CONNECT
- TRACE


The most commonly used method, a **GET** request, is used to retrieve data. We will be focusing on retrieving data from an APIs, which require this type of request.  

## What is an API?

An API, or Application Programming Interface, is a server that you can use to retrieve and send data using code.  

![api-request](assets/api-request.svg)

When we want to receive data from an API, all we need to do is make an HTTP request to a specific server, and the server will 'serve' up the data. 

For this tutorial, we will be looking at data provided by [OpenNotify](http://open-notify.org/). Open Notify is an open source project to provide a simple programming interface for some basic NASA data. It’s a great API for learning because it has a very simple design, and doesn’t require authentication. 

This API was created by a web developer named Nathan Bergey who likes space. According to the website, "Open Notify started as a project thrown together at Science Hack Day SF in 2010. From there I built a lamp that lights up when the International Space Station flies over. I needed data to run the lamp so I made a simple service that calculated the upcoming pass times for a given location."

## API Documentation


To ensure we make a successful request, it’s important to consult the documentation. Documentation can seem scary at first, but as you use documentation more and more you’ll find it gets easier. Being able to navigate documentation is a crucial step towards becoming a product programmer.

Often there will be multiple APIs available on a particular server. Each of these APIs are commonly called endpoints. The endpoint which we have been using is http://api.open-notify.org/astros.json, which returns data about astronauts currently in space.

The documentation for this endpoint can be found [here](https://open-notify.org/Open-Notify-API/People-In-Space/#json). By checking the documentation, we can see that this API doesn't require any parameters, which will make it a great place to start. 

## Requests Library

In order to interface with APIs in Python, we need tools that will make those requests. The  [requests library](https://requests.readthedocs.io/en/latest/) is the de facto standard for making HTTP requests in Python. The `requests` library isn’t part of the standard Python library, so you need to make sure it is installed before using it. Since Ms. Manor has already installed `requests` in this replit, all you need to do is import the library by using the following line at the top of you `main.py` file. 

```python
import requests
```

Now, you should be able to call the library when you need to!

## The GET Request

The HTTP method to use is determined by which action you’re trying to perform when making an HTTP request. The GET method indicates that you’re trying to get or retrieve data from a specified resource.  To make a ‘GET’ request, we’ll use the `requests.get()` function, which requires one argument — the URL we want to make the request to.

```python
requests.get('http://api.open-notify.org/astros.json')
```

If you run that code as-is in your main.py file it may appear on the outside that absolutely nothing happened. Before moving onto the next section, ask yourself why this might be true. 




## The Response

A Response is a powerful object for inspecting the results of the request. Let’s make that same request again, but this time store the return value in a variable so that you can get a closer look at its attributes and behaviors:

```python
response = requests.get('http://api.open-notify.org/astros.json')
```

In this example, you’ve captured the return value of `get()`, which is an instance of Response object, and stored it in a variable called response. You can now use response to see a lot of information about the results of your `GET` request.

Since an HTTP request is inherently following a protocol, we can make certain assumptions about what a response will contain. The two main pieces of the response that we will look at is the Status Code and the Content.


### Status Code

When we make a GET request, the response from the API comes with a response code which tells us whether our request was successful. Response codes are important because they immediately tell us if something went wrong.

Remember that the `get()` function returns a response object. By accessing the .status_code attribute of the object, we can see the status code that the server returned:

```python
print(response.status_code)
```

`.status_code` returned a 200, which means your request was successful and the server responded with the data you were requesting.

Sometimes, you might want to use this information to make decisions in your code:

```python
if response.status_code == 200:
    print('Success!')
elif response.status_code == 404:
    print('Not Found.')
```

With this logic, if the server returns a 200 status code, your program will print Success!. If the result is a 404, your program will print Not Found.

Let’s learn a little more about common status codes.

## API Status Codes
Status codes are returned with every request that is made to a web server. Status codes indicate information about what happened with a request. Here are some codes that are relevant to GET requests:

* 200: Everything went okay, and the result has been returned (if any).
* 301: The server is redirecting you to a different endpoint. This can happen when a company switches domain names, or an endpoint name is changed.
* 400: The server thinks you made a bad request. This can happen when you don’t send along the right data, among other things.
* 401: The server thinks you’re not authenticated. Many APIs require login credentials, so this happens when you don’t send the right credentials to access an API.
* 403: The resource you’re trying to access is forbidden: you don’t have the right permissions to see it.
* 404: The resource you tried to access wasn’t found on the server.
* 503: The server is not ready to handle the request.

Do you notice any patterns in the status codes?

If you’re interested you can read more about status codes [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).


## Content

The response of a GET request often has some valuable information, known as a payload, in the message body. Using the attributes and methods of Response, you can view the payload in a variety of different formats.

To see the response’s content as a `byte` object, you use `.content`. A bytes object is an immutable sequence of single byte values

```python
response = requests.get("http://api.open-notify.org/astros.json")
print(response.content)
print(type(response.content))
```

```python
b'{"number": 10, "people": [{"name": "Oleg Artemyev", "craft": "ISS"}, {"name": "Denis Matveev", "craft": "ISS"}, {"name": "Sergey Korsakov", "craft": "ISS"}, {"name": "Kjell Lindgren", "craft": "ISS"}, {"name": "Bob Hines", "craft": "ISS"}, {"name": "Samantha Cristoforetti", "craft": "ISS"}, {"name": "Jessica Watkins", "craft": "ISS"}, {"name": "Cai Xuzhe", "craft": "Tiangong"}, {"name": "Chen Dong", "craft": "Tiangong"}, {"name": "Liu Yang", "craft": "Tiangong"}], "message": "success"}'
<class 'bytes'>
```

While `.content` gives you access to the raw bytes of the response payload, you will often want to convert them into a string using a character encoding such as UTF-8. response will do that for you when you access `.text`:

```python
print(response.text)
print(type(response.text))
print(response.encoding)
```

```python
{"number": 10, "people": [{"name": "Oleg Artemyev", "craft": "ISS"}, {"name": "Denis Matveev", "craft": "ISS"}, {"name": "Sergey Korsakov", "craft": "ISS"}, {"name": "Kjell Lindgren", "craft": "ISS"}, {"name": "Bob Hines", "craft": "ISS"}, {"name": "Samantha Cristoforetti", "craft": "ISS"}, {"name": "Jessica Watkins", "craft": "ISS"}, {"name": "Cai Xuzhe", "craft": "Tiangong"}, {"name": "Chen Dong", "craft": "Tiangong"}, {"name": "Liu Yang", "craft": "Tiangong"}], "message": "success"}
<class 'str'>
utf-8
```

note: Because the decoding of bytes to a str requires an encoding scheme, requests will try to guess the encoding based on the response’s headers if you do not specify one. You can provide an explicit encoding by setting `.encoding` before accessing `.text`.

If you take a look at the response, you’ll see that it resembles a dictionary. In fact, it is actually serialized JSON content, which can be easily ported to a dictionary which makes it much easier to parse the data. We will look at this more in the next replit.  



