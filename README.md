<h1 align="center" style="display: block; font-size: 2.5em; font-weight: bold; margin-block-start: 1em; margin-block-end: 1em;">

<a name="logo" href="placeholder"><img align="center" src="https://github.com/oslabs-beta/metronome/assets/88234607/101a5734-211d-42e3-9123-e63623f46ed3" alt="Metronome Logo (Home)" style="width:25%;height:25%"/></a>
  <br /><br /><strong>[Metronome](#metronome)</strong>
  
</h1>
<div align="center"> 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
[![ApexCharts](https://img.shields.io/badge/ApexCharts-5A2A7E?style=for-the-badge&logo=apexcharts&logoColor=white)](https://apexcharts.com/)

<br /><br />

---

<p align="center" style="display: block; font-size: 1.5em; font-weight: bold; margin-block-start: 1em">
Quick Links
  <br /><br />
</p>
<p align="center" style="font-size: 1em">
<a name="website" href="https://getreaper.io/">Website</a>
<a name="medium" href="https://medium.com/@annako/reaper-an-open-source-dev-tool-to-analyze-react-application-performance-786f1d40f6de">Medium</a>
</p>
<br /><br />

</div>

---


  <!-- TABLE OF CONTENTS -->
  
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#what-is-metronome?">What is Metronome?</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#how-does-it-work?">How Does it Work?</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## What is Metronome?


Metronome is a tool used to better improve render times of components. Have you ever had an issue with pin pointing why a component hasn't rendered efficiently in a application? Metronome will help with honing in on what causes slow render times and go indepth on where to update the code.

Here's why:
* Certain components may re-render inefficently due to a multitude of factor; with Metronome, components can be identified and be refactored for better render times
* With the graphs provided by Metronome, developers can better see which components is taking the longest to render
* The component tree and the record feature will aid developers in visualizing each individual component when tracking down the cause of slow render times in their application

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

In order for Metronome to function, you will need to intsall the latest chrome extension of React Developer Tools. This only works for functional components and not class components.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/metronome.git
   ```
2. Install NPM packages
   ```sh
   cd metronome
   npm install
   cd chrome-extension
   npm install
   ```
3. Build DIST folder

   ```sh
   npm start
   ```

### How to Add Metronome as a Chrome Extention

4. Go to chrome://extensions/
5. Click on Load unpacked
6. Locate the file in the filpath (metronome/chrome-extension/dist) and select
7. Once the extension is loaded, go to detail section and turn on "Allow access to file URLs"
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Features

## Data Parsing
Before we show the visualizations and charts powered by Metronome, let’s first go through the data parsing. Metronome parses through the React fiber tree for each recorded action that was profiled by the user, and filters out non-functional components(which are not part of the virtual DOM) in the object.

In addition to this, Metronome determines whether a component has rendered with logic that compares the render data between the node and its children, and establishes the relationship between the current node and the overall fiber tree. It then pulls the actual duration and self based duration of each rendered component and tracks the number of times a component renders during the recorded action.

![image](https://github.com/oslabs-beta/metronome/assets/88234607/ba5e15d3-b017-4e24-8b91-fff711f68f28)

## Component Tree
Metronome presents a real-time visualization of the component tree by parsing through the React Fiber Tree and presenting functional components as state and props change over time. This allows users to easily see the relationship between the components.

![image](https://github.com/oslabs-beta/metronome/assets/88234607/0c40f5ef-a4a4-406b-a652-bb5265b26035)

<p align="center"><i><sub style="font-size: 11px; color: gray;">example of a component tree rendered by Metronome</sub></i></p>

Users can see the tree update in real time as components are updated in the application.

![image](https://github.com/oslabs-beta/metronome/assets/88234607/a2f698b5-fddd-4678-919c-1730df22d034)

## React Metrics
Have you ever wondered which part of your React application is taking the longest to render? Or wondered how many times a component re-renders when you click refresh? Metronome aims to help developers analyze and troubleshoot their React applications by providing visualizations of these metrics.

![image](https://github.com/oslabs-beta/metronome/assets/88234607/8d6e4a7d-4b11-4b2d-99ad-5cc793daafba)

## Component Render Durations
With the parsed data, Metronome compiles and displays the sum of all self-based durations for all instances that a specific component renders during a recorded action that was profiled by the user.

![image](https://github.com/oslabs-beta/metronome/assets/88234607/36543aa5-f24d-451f-a367-781e024bc74b)

<p align="center"><i><sub style="font-size: 11px; color: gray;">example of a component tree rendered by Metronome</sub></i></p>

The component render durations is a pie chart that shows the breakdown of all components that have actively rendered during the profiled event, and as shown in the screenshot below, a user can get a breakdown of which components rendered for the longest duration (measured in ms). This informs the user of what is taking up the most render time when they perform specific actions in their React application.

## Component Render Frequencies

Metronome lends insight for users to track how many times a component has rendered when a specific action in the React application is profiled by the user. For example, When you click refresh, how many times does your Navbar render? This could be helpful for users to optimize their React applications and pinpoint inefficiencies in their app.

In the bar chart, Metronome ranks and displays the number of times a component has rendered during the profiled event. This is updated each time a user is done profiling a new action on their React Application.

<p align="center">
  <img src="https://github.com/oslabs-beta/metronome/assets/88234607/f460a286-d4cc-4e8c-9185-aa4b6f8951e8"  alt="Bar Chart in Metronome for a Sample React Application">
</p>
<p align="center"><i><sub style="font-size: 11px; color: gray;">Bar Chart in Metronome for a Sample React Application</sub></i></p>


<!-- How Does It Work -->
## How Does It Work
![image](https://github.com/oslabs-beta/metronome/assets/88234607/dbe4837c-dcb4-45a8-a080-3f84b7f0f3ab)



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Bruce Onuigbo - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [[https://github.com/oslabs-beta/metronome](https://github.com/oslabs-beta/metronome)]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
