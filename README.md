# Data Lovers

## Index

* [1. Preamble](#1-preamble)
* [2. Project Summary](#2-Project-Summary)
* [3. Research](#3-Research)
* [4. User stories.](#4-User-stories)
* [5. User Interface Design](#5-User-Interface-Design)
* [6. Usability Testing](#6-Usability-Testing)
* [7. Results](#7-Results)


***

## 1. Preamble

According to [Forbes](https://www.forbes.com/sites/bernardmarr/2018/05/21/how-much-data-do-we-create-every-day-the-mind-blowing-stats-everyone-should-read),
90% of the data that exists today has been created in the last two years. Every day, we generate 2.5 million terabytes of data, an unprecedented figure.

However, data by itself is of little use. In order for these massive amounts of data to become easily readable **information** for users, we need to understand and process this data. One simple way to do this is by creating interfaces and visualizations.

In the following image, you can see how an user-friendly and understandable interface can be built on the right side using the data shown on the left:

![pokemon-data-to-ui](https://user-images.githubusercontent.com/12631491/218505816-c6d11758-9de4-428f-affb-2a56ea4d68c4.png)

## 2. Project Summary

In this project, a web page is built to visualize a set of data that is tailored to what you discover our user needs.

The final deliverable is a web page that allows for data visualization, filtering, sorting, and performing some aggregated calculations. Aggregated calculations refer to various computations that can be applied to the data to display even more relevant information for users (average, maximum or minimum value, etc).

This time, a series of data from different themes is proposed, and in our case, we specifically chose the Pokemon datasets.

Once the area of interest is defined, the goal is to understand who our user is and what they specifically need to know or see. This understanding aids in constructing an interface that helps the user interact with and better comprehend the data. This project was a team effort, completed in approximately 3 weeks with 3 sprints.

The main objective of this project is to learn how to design and build a web interface where data can be visualized and manipulated, all while understanding the needs of the user.

## 3. Research

We asked some loyal Pokemon followers what the key features for an application of this kind would be, and they shared the following with us: "As a user/enthusiast/collector of POKEMON, I want an intuitive and straightforward interface to find the data I need, such as:

* Knowing the abilities/strengths/weaknesses to win battles.
* Visualizing the Pokémon by types.
* Finding Pokémon by name, Pokedex number."

On the other hand, we found the following information on the web: "A study presented by Survey Monkey Intelligence revealed some details about the usage of the augmented reality video game Pokémon Go. Regarding gender, the study indicates that 63% of Pokémon Go players are women, while 37% are men.

Furthermore, young adults between 18 and 29 years old are the ones who dedicate the most time to playing Pokémon Go, making up 46% of the player base. Meanwhile, users between 30 and 50 years old constitute 25% of the total players."

For this reason, we have defined our user within the age range of 18 to 29 years old, with a profile that leans more towards the female gender. This decision is based on the study's indication that this gender represents a higher percentage of players.

The most relevant data presented in the interface includes: sorting by numerical order in both ascending and descending order, sorting by type, rarity, and generation. On the homepage, we offer the option to explore different regions. One side features the Kanto region, while the other side features the Johto region. On the back of each created card, we've decided to display the special attack of each Pokémon. We have chosen to present these data points because they are the most significant in helping the user understand the value of their Pokémon. Based on this information, users can make decisions about collecting Pokémon and determine which opponents or types of Pokémon they might face in battles.

The product can be used both before and during the Pokémon collection process, during battles against other teams, or simply as an application that allows users to learn about the Pokémon within the Kanto and Johto regions.

## 4. User stories

**UH 1** 

**Definition of Ready.** 

* As a user, I would like an application where I can view the Pokémon from the Kanto and Johto regions.
* I would prefer to see the Pokémon presented in the form of cards.
* I want the application to have a design that follows the color palette of the Pokémon brand.

**Definition of Done** 

**Create Low-Fidelity Proposal on Trello:**
  * Set up a Trello board for the project.
  * Create a card titled "Low-Fidelity Design Proposal."
  * Add details about the proposed design, including the layout of the cards displaying Kanto and Johto Pokémon,   and any other relevant information.

**Define Pokémon Color Palette:**
  * Research and identify the official color palette used by the Pokémon brand.
  * Create a card on Trello titled "Pokémon Color Palette."
  * List the main colors along with their hex codes or RGB values.

**Fork Project Repository:**
  * Go to the repository of the project on the version control platform (like GitHub).
  * Fork the repository to create your own copy under your GitHub account.

**Update Local Files for Each Collaborator:**
  * Make sure each collaborator has Git installed on their local machines.
  * Each collaborator should clone the forked repository to their local machine using the git clone command.
  * Collaborators can make changes to the project files on their local machines.
  * To update the local repository with the changes from the forked repository, collaborators can use the git pull command.

**UH 2**

**Definition of Ready.** 

* As a user, I would like to have a high-fidelity prototype.
* I want to see the proposal for the cards and the filter design.
* I would like to be able to choose which region to examine and have the ability to switch between regions.
* I want the application to be easy to operate and intuitive.

**Definition of Done**

**High-Fidelity Design in Figma:**
* Create a detailed high-fidelity design using Figma.
* Ensure the design accurately represents the cards and filter layout.

**Display Cards in the Interface:**
* Implement the designed cards within the application's interface.

**Functional Filter Features with Testing:**
* Implement the filter functionalities according to the design.
* Conduct at least one testing iteration to ensure filters work as intended.

**Updated GitHub Repository for Both Collaborators:**
* Ensure that the GitHub repository is up-to-date for both collaborators.
* Collaborators should have the latest version of the codebase in their respective local repositories.

**UH 3**

**Definition of Ready.** 

* I would like to see the attack value of the Pokémon.
* I want the filters to work when combined, and they should be able to display more specific data according to my preferences.
* I want each card to show attack information on the back, and these cards should flip when the cursor is hovered over them.
* I want the application to be responsive and work across various types of devices.

**Definition of Done** 

**Display Attack Information with Basic Statistics Function:**
* Implement a function that presents attack information using basic statistical calculations.
* Implement the functionality to determine the attack based on the Pokémon's type and its opponent's weakness

**Implement Filter Combination Functionality and Pass Testing:**
* Develop a feature that enables the combination of filters.
* Conduct testing to ensure the combined filters work correctly and produce accurate results.

**Responsive Application Review:**
* Verify that the application's design is responsive and functions well on different devices and screen sizes.

**Achieve 80% Test Coverage for Functionality and Testing:**
* Ensure that the code implementation for functions and corresponding tests covers at least 80% of the application's features.

**Finalize README Information:**
* Complete the information in the README file to document the application's development process, including setup instructions, usage guidelines, and any other relevant details.

## 5. User Interface Design

  #### Low-Fidelity Prototype

**First low fidelity prototype**
![Image 1](src/assets/Baja%20fidelidad_1.png)
![Image 2](src/assets/Baja%20fidelidad_2png.png)
![Image 3](src/assets/Baja%20fidelidad_3.png)
![Image 4](src/assets/Baja%20fidelidad_4.png)
![Image 5](src/assets/Baja%20fidelidad_5.png)

 
 We combine the two low-fidelity prototypes to design the high-fidelity one.

  #### High-Fidelity Prototype"

link for high-fidelity prototype: https://zpl.io/dxBPoB7.  

## 6. Usability Testing

During the challenge, we conducted usability tests with different users to gather valuable feedback. Based on the insights obtained from these tests, we iterated on our designs to enhance the user experience. Below, we outline the usability issues we identified through the tests and the improvements we made in our final proposal.

**Identified Usability Issues**
Issue 1: Cards are displayed closely together without spacing, making them appear as solid blocks rather than distinct cards.
Issue 2: Filters perform filtering correctly but do not return values unless they are combined.
Issue 3: Users need to see a zero value within the filters.
Issue 4: A reset button is required to clear the selected filter values.
Issue 5: The user requests that we should be able to change the region when any filter is activated.

**Design Improvements**
Improvement 1: We had card information within a grid and added spacing with a gap to create separation between each card.
Improvement 2: We implemented a function to filter multiple filters together for more specific user searches.
Improvement 3: To make zero values noticeable, we included this value within the filters, allowing filtering according to user preferences.
Improvement 4: We added an extra button in the filter bar with the function to clear selected values from each filter.
Improvement 5:We made the region-changing function capable of identifying when a filter is activated, thus allowing the region to be changed when the button is pressed.

By conducting usability tests and iteratively refining our designs, we aimed to create a more user-friendly and effective solution.

## 7. Results
The following project was created to facilitate the search of Pokémon for enthusiasts. One of its functions is to organize the data regarding Pokémon from each region, both Johto and Kanto, and to filter the information by rarity, generation, and type. For this purpose, we have placed three search filters on a top bar, and at the same time, we have added a search by name or by number. At the end of the search filters, we have included a button that allows the user to reset the selected information and return the markers to their initial state.

The information is displayed in the form of cards. On the front side of each card, there is the image of each Pokémon, its name, and its assigned number. On the back side, its attack type is shown. The cards have a feature that allows them to flip when the cursor hovers over them.

The information can also be sorted in ascending and descending order. There are two buttons on the filter bar that enable this action.

At the bottom of the application, there is a region switch button. This button takes you to the data of the other region without needing to return to the home page.

To keep track of the region or type of filter applied, there is a marquee that displays the user's actions.

As a final addition to the application, we have implemented the functionality to determine the attack based on the Pokémon's type and its opponent's weakness.

The application is responsive for various devices.