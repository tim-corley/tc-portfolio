---
title: Automated UI Testing with Selenium & PyTest
date: '2021-04-07'
tags: ['testing', 'python', 'selenium', 'pytest']
draft: false
summary: "An introduction to automated user interface testing with Selenium & PyTest"
images: []
---

## Intro

User Interface (UI) Testing is a key component of the software development life-cycle that helps to ensure the shipping of high quality software. However, a common problem with UI Testing is that it is slow & tedious when done manually - especially when working with large, complex, modern web applications. Thus, many software teams are turning to automation in order to more quickly and efficiently execute UI Testing. 

This article outlines the process of setting up an Automated UI Testing suite that can be adapted / extended to almost any web application. The tools being used are:
 - **Python3** - one of the most popular programming languages with a huge community and countless resources available online
 - **PyTest** - a framework that makes building simple and scalable tests easy
 - **Selenium** - a toolset for web browser automation that uses the best techniques available to remotely control browser instances and emulate a user’s interaction with the browser  

## Development Environment

### Prerequisites

You must have [Python v3.7+](https://www.python.org/downloads/) installed on your machine along with [pipenv](https://pypi.org/project/pipenv/). You'll also want to have an IDE - a common choice is [PyCharm](https://www.jetbrains.com/pycharm/)

### Getting Started

Create a new project directory & activate a virtual environment
```bash
$ mkdir pytest_demo && cd pytest_demo && pipenv shell
```

Install dependencies
```bash
$ pipenv install selenium pytest pytest-xdist python-dotenv
```

## WebDrivers

According to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/WebDriver), a WebDriver is:
> a remote control interface that enables introspection and control of user agents. It provides a platform- and language-neutral wire protocol as a way for out-of-process programs to remotely instruct the behavior of web browsers.

A WebDriver will be required for each browser you're using to execute tests on (typically: Chrome, Firefox, Safari). Download a copy via these links:

 - [ChromeDriver](https://chromedriver.chromium.org/downloads)
 - [geckodriver](https://github.com/mozilla/geckodriver/releases) (for Firefox)

Note that the ChromeDriver versions needs to match the Chrome browser version being used (when you update Chrome, you'll need to download the new, corresponding driver again). Once downloaded, move the files to your `/usr/local/bin` directory - Selenium knows to look for them here. 
```bash
$ sudo unzip chromedriver_linux64.zip -d /usr/local/bin
```
```bash
$ sudo tar -xf geckodriver-v0.29.0-linux64.tar.gz -C /usr/local/bin
```

Check that the driver were installed properly (use `Ctrl` + `c` to stop the processes):
```bash
$ chromedriver --version
ChromeDriver 89.0.4389.23 (61b08ee2c50024bab004e48d2b1b083cdbdac579-refs/branch-heads/4389@{#294})

$ chromedriver
Starting ChromeDriver 89.0.4389.23 (61b08ee2c50024bab004e48d2b1b083cdbdac579-refs/branch-heads/4389@{#294}) on port 9515
Only local connections are allowed.
Please see https://chromedriver.chromium.org/security-considerations for suggestions on keeping ChromeDriver safe.
ChromeDriver was started successfully.

$ geckodriver --version
geckodriver 0.29.0 (cf6956a5ec8e 2021-01-14 10:31 +0200)

The source code of this program is available from
testing/geckodriver in https://hg.mozilla.org/mozilla-central.

This program is subject to the terms of the Mozilla Public License 2.0.
You can obtain a copy of the license at https://mozilla.org/MPL/2.0/.

$ geckodriver
1617662745505	geckodriver	INFO	Listening on 127.0.0.1:4444
```

You can place the drivers anywhere but will need to specify the filepath in your webdriver initialization method later on.  

## Test Development

The project will be divided up into **pages** and **tests** and contain a `config.json` file at the project root. Setup your project to look like:
```
.
├── config.json
├── pages
│   ├── __init__.py
├── Pipfile
├── Pipfile.lock
└── tests
```

### Configuration Details

We'll want to specify a few key items that the tests will need to know in order to run - namely, which browser to use and what URL to navigate to once the window is launched. In the `config.json` file add:

```json
{
  "browser": "Chrome",
  "implicit_wait": 10,
  "target_url": "http://automationpractice.com/"
}
```

Also, at this point, you'll want to create an account on this site to use for testing. Navigate to Automated Practice's [create an account page](http://automationpractice.com/index.php?controller=authentication&back=my-account) and manually create a new test account. Then add the email address, password, and user name to a `.env` in your project root.


### Webdriver Initialization

Each test will need an instance of the webdriver so let's set that up first. In your `tests` directory, add a `conftest.py` file. PyTest know that when starting any test, to use the `conftext.py` file to setup test configuration details. Within this file add:
```python
"""
This module contains shared fixtures
"""

import json
import pytest
from selenium import webdriver


@pytest.fixture
def config(scope="session"):

    # read config file
    with open('config.json') as config_file:
        config = json.load(config_file)

    # assert values are acceptable
    assert config['browser'] in ['Firefox', 'Chrome', 'Headless Chrome']
    assert isinstance(config['implicit_wait'], int)
    assert config['implicit_wait'] > 0

    return config


@pytest.fixture()
def browser(config):
    if config['browser'] == 'Firefox':
        wd = webdriver.Firefox()
    elif config['browser'] == 'Chrome':
        wd = webdriver.Chrome()
    elif config['browser'] == 'Headless Chrome':
        opts = webdriver.ChromeOptions()
        opts.add_argument('headless')
        wd = webdriver.Chrome(options=opts)
    else:
        raise Exception(f'The "{config["browser"]}" browser is not supported')
    # set calls to wait for up to 10 seconds for elements
    wd.implicitly_wait(config['implicit_wait'])
    # resize browser window
    wd.maximize_window()
    wd.get(config['target_url'])
    # return the WebDriver instance for the setup
    yield wd
    # Quit the WebDriver instance for the cleanup
    wd.quit()
```

### Page Object Model

Each route / page of a web application should have its own Page Object Model - that is locators and actions specific to that page. As a example, add a `nav.py` file to the `pages` directory. This file will contain locators and methods for the navigation bar. Within this file add:

```python
"""
This module contains HeaderNav,
the page object for the Automation Practice header navigation bar
"""

from selenium.webdriver.common.by import By


class HeaderNav:

    SIGN_IN = (By.CSS_SELECTOR, 'a[class="login"]')
    SIGN_OUT = (By.CSS_SELECTOR, 'a[class="logout"]')
    USERNAME = (By.CSS_SELECTOR, 'a[class="account"]')
    CONTACT = (By.ID, 'contact-link')

    def __init__(self, browser):
        self.browser = browser

    def navigate_to(self, page):
        if page == 'signin':
            self.browser.find_element(*self.SIGN_IN).click()
        elif page == 'contact':
            self.browser.find_element(*self.CONTACT).click()
        elif page == 'logout':
            self.browser.find_element(*self.SIGN_OUT).click()

    def verify_user_login(self, username):
        username_display = self.browser.find_element(*self.USERNAME)
        return username_display.is_displayed() and username_display.text == username
```

In order to execute a "User Can Successfully Login" test case, we'll need to click 'Sign In' from the Nav and then input credentials. So next let's add a Page Object Model for the auth page:

```python
"""
This module contains AuthPage,
the page object for the Automation Practice login / signup page
"""
import os
from dotenv import load_dotenv
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


class AuthPage:
    load_dotenv()
    EMAIL_INPUT = (By.ID, 'email')
    PASSWORD_INPUT = (By.ID, 'passwd')
    SIGNIN_BUTTON = (By.ID, 'SubmitLogin')
    USER_EMAIL = os.getenv('EMAIL')
    USER_PASSWORD = os.getenv('PASSWORD')

    def __init__(self, browser):
        self.browser = browser

    def input_login_credentials(self):
        email_input = self.browser.find_element(*self.EMAIL_INPUT)
        password_input = self.browser.find_element(*self.PASSWORD_INPUT)
        email_input.send_keys(self.USER_EMAIL + Keys.TAB)
        password_input.send_keys(self.USER_PASSWORD)

    def click_sigin_button(self):
        self.browser.find_element(*self.SIGNIN_BUTTON).click()
```

### Tests

Now that we've got a couple of page object models (for the pages need in order to login a user), let's put together an actual test. Add a `test_auth.py` file to the `tests` directory (the `test_` prefix is important, it is how pytest recognizes tests). Within this file add: 

```python
"""
These tests cover Automation Practice Login / Signup page
"""

import os
from dotenv import load_dotenv
from pages.auth import AuthPage
from pages.nav import HeaderNav


def test_UserLogin(browser):
    load_dotenv()
    username = os.getenv('USERNAME')
    nav = HeaderNav(browser)
    auth = AuthPage(browser)
    nav.navigate_to('signin')
    auth.input_login_credentials()
    auth.click_sigin_button()
    assert nav.verify_user_login(username)
```

## Running Tests

To execute tests, run:
```bash
$ pipenv run python -m pytest
```

You should see the browser launch and the test steps being executed. Once the test is completed, you'll see output in console similiar to:
```bash
(pytest_demo) ➜  pytest_demo git:(main) pipenv run python -m pytest tests/test_auth.py 
Loading .env environment variables...
======================================= test session starts ========================================
platform linux -- Python 3.8.5, pytest-6.2.3, py-1.10.0, pluggy-0.13.1
rootdir: /home/tim/Projects/Selenium/pytest_demo
plugins: xdist-2.2.1, forked-1.3.0
collected 1 item                                                                                   

tests/test_auth.py .                                                                         [100%]

======================================== 1 passed in 7.93s =========================================

```

## Resources

 - My [selenium-pytest repo](https://github.com/tim-corley/selenium-pytest) contains more examples built off of the steps outlined here
 - [Selenium WebDriver with Python](https://testautomationu.applitools.com/selenium-webdriver-python-tutorial/) course by AppliTools
