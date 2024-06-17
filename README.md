# GSoC Issue Tracker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/kash2104/gsoc-issue-tracker/releases)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/kash2104/gsoc-issue-tracker/actions)

## Overview

The GSoC Issue Tracker is a web application designed to streamline the process of tracking and managing issues for Google Summer of Code (GSoC) organizations and their repositories. It provides a centralized platform to view, filter, and navigate through issues across different projects, helping mentors and students stay organized and efficient.

## Features

- **Organization Listing**: View all participating GSoC organizations.
- **Repository Management**: Access detailed information about each organization's repositories.
- **Issue Tracking**: Track open issues, filter by assignee, and navigate through detailed issue pages.
- **Search Functionality**: Quickly find organizations and repositories using the search bar.
- **Pagination**: Efficiently navigate through large datasets with paginated views.


## Screenshots

![Home Page](https://github.com/kash2104/gsoc-issue-tracker/assets/123300261/fae5a22f-7662-4718-908c-715e6911662c)


*Featuring our home page where you will find all the organizations listed. Here you can navigate to all different organizations and also filter Organizations according to your intersting technologies.*

![image](https://github.com/kash2104/gsoc-issue-tracker/assets/123300261/0e76185f-c969-4cd9-9027-7a4bb5182cad)


*After clicking on view details you will be navigated to the page where all the repositories are listed. Here you can select the repository and check all the unassigned issues to contribute in GSOC.*

![image](https://github.com/kash2104/gsoc-issue-tracker/assets/123300261/5309f066-e471-4a43-ae25-eb1d4ac13ef4)

*You can navigate to all the unassigned open issues for that repository and if any issue interests you then you will be reidrected to GitHub Page for the same.*

## Installation

### Prerequisites

- Next.js (v13 or higher)
- npm (v6 or higher)
- Redis (for local caching)

### Steps

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/kash2104/gsoc-issue-tracker.git
    cd gsoc-issue-tracker
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Setup Environment Variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    NEXT_PUBLIC_API_URL=your_api_url
    ```

4. **Run the Application:**

    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:3000`.

## Usage

1. **Home Page:**

    The home page lists all participating GSoC organizations. You can use the search bar to filter organizations by name.

2. **Organization Details:**

    Click on an organization to view its repositories. Each repository lists its open issues, which you can further explore.

3. **Issue Details:**

    Click on an issue to view detailed information including assignee, comments, and labels.


### Using Redis for Caching

Ensure you have set up Redis and configured the environment variables properly. Update your `redisClient.ts` to use Redis.


## Deployment

### Vercel

To deploy the application on Vercel:

1. **Login to Vercel:**

    ```bash
    vercel login
    ```

2. **Deploy:**

    ```bash
    vercel
    ```

    Follow the prompts to complete the deployment.


## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Tags

- GSoC
- Issue Tracker
- Open Source
- Next.js
- Vercel
- Redis

## Website

[GSOC Issue Tracker](your_website_link)


---

*Made with ❤️ by [Tirthraj Raval](https://www.linkedin.com/in/tirthraj-raval-773422263) and [Kavish Parikh](https://www.linkedin.com/in/kavish-parikh)*
