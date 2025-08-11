---
title: Scaling Selenium with Docker
date: '2021-04-13'
tags: ['testing', 'python', 'selenium', 'docker']
draft: false
summary: "Get the benefits of distributed testing via Selenium Grid & Docker Compose"
images: []
---

## Intro

If you've got lots of tests running locally and they're taking quite a bit of time to run or if you're limited to only a couple of types / versions of browsers that they're run on, there is a perfect solution. If you do not yet have any tests setup / running, check out [this article](https://www.tim-corley.dev/blog/automated-ui-testing-with-selenium-pytest.) first. By leveraging the power of **Selenium Grid** along with **Docker**, you can distribute test execution across many browser types / versions and speed up those test runs. 

The two keys here are going to be **A)** getting a Selenium Grid instance up-and-running using Docker containers and **B)** configuring the Selenium WebDriver to use a remote driver. Before diving into the details though, let's go over what these technologies are. 

Selenium Grid consists of a hub, basically a server where the test scripts are run from, and several nodes where the test execution occurs on a remote browser. Docker is a tool used to run containers on your machine - kind of like lightweight VMs - that bundle/hold a specific configuration of technolgies needed for a particular task (in our case, running a hub and some nodes). On top of this, we'll utilize Docker Compose which is a tool to orchestrate several containers and run them in sync in order to achieve a desired state. 

Great! Let's now get into the details...

## Docker 

First, you'll want to make sure you've got  both [Docker](https://docs.docker.com/engine/install/) as well as [Docker Compose](https://docs.docker.com/compose/install/) installed. 

```bash
➜  ~ docker --version
Docker version 20.10.5, build 55c4c88
➜  ~ docker-compose --version
docker-compose version 1.26.2, build eefe0d31
```

A few images are going to be required, download the following:
```bash 
➜  ~ docker pull selenium/hub
➜  ~ docker pull selenium/node-chrome
➜  ~ docker pull selenium/node-chrome-debug
➜  ~ docker pull selenium/node-firefox
➜  ~ docker pull selenium/node-firefox-debug
```

Then, a `docker-compose.yml` file will be needed to spin up the containers with these images together. At project root, add:

```yml
version: "3"
services:
  selenium-hub:
    image: selenium/hub
    ports:
      - "4444:4444"
    environment:
      GRID_MAX_SESSION: 16
      GRID_BROWSER_TIMEOUT: 300
      GRID_TIMEOUT: 300

  chrome:
    image: selenium/node-chrome
    depends_on:
      - selenium-hub
    environment:
      HUB_PORT_4444_TCP_ADDR: selenium-hub
      HUB_PORT_4444_TCP_PORT: 4444
      NODE_MAX_SESSION: 4
      NODE_MAX_INSTANCES: 4

  firefox:
    image: selenium/node-firefox
    depends_on:
      - selenium-hub
    environment:
      HUB_PORT_4444_TCP_ADDR: selenium-hub
      HUB_PORT_4444_TCP_PORT: 4444
      NODE_MAX_SESSION: 4
      NODE_MAX_INSTANCES: 4
```

Finally, run the containers by executing: `➜  ~ docker-compose up` and check that containers are running successfully by using: `➜  ~ docker ps`. Thats it! We've now got Selenium Grid running - you can even see it by navigating to: [http://localhost:4444/grid/console](http://localhost:4444/grid/console)

## Remote Webdriver

Now that Selenium Grid is ready and running, we've got to configure our tests - spefically, the webdriver initialization - to tell it to use the [RemoteWebDriver](https://www.selenium.dev/documentation/en/remote_webdriver/remote_webdriver_client/). Adjust your webdriver initialization method to look something like:

```python
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


class WebDriverInstance:

    def browser_init(self, browser_type):
        if browser_type == 'Firefox Remote':
            opts = webdriver.FirefoxOptions()
            opts.headless = True
            wd = webdriver.Remote(
            command_executor="http://localhost:4444/wd/hub",
            desired_capabilities = DesiredCapabilities.FIREFOX,
            options=opts)
        elif browser_type == 'Chrome Remote':
            opts = webdriver.ChromeOptions()
            opts.add_argument('headless')
            wd = webdriver.Remote("http://localhost:4444/wd/hub", opts.to_capabilities())
        else:
            error(logger, 'The browser - {} - is not supported.'.format(browser_type))
        return wd
```

### Running (Distributed) Tests

With the Docker container running Selenium Grid (a hub & several nodes) and with this remote webdriver configuration, things are now ready to go. Just kick-off tests as you normally would locally- for example, if using PyTest:

```bash
➜  ~ python -m pytest
```

### Bonus: Test Parallelization

Now that your tests are distributed remotely, yet another feature can be easily implemented to make the test run even faster. Run your tests in parallel by installing the PyTest plugin **[pytest-xdist](https://pypi.org/project/pytest-xdist/)** and then adding a flag to specify number of processes to use (here up to 3 threads will be used):

```bash
➜  ~ python -m pytest -n 3
```

## Resources

 - My [selenium-docker repo](https://github.com/tim-corley/selenium-docker) contains more examples built off of the steps outlined here
 - [Scaling Tests with Docker](https://testautomationu.applitools.com/scaling-tests-with-docker/) course by AppliTools