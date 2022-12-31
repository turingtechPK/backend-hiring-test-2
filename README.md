# TuringTech - Backend technical test (Beginner -> Intermediate)

This test is a part of our hiring process at TuringTech for [backend positions](https://hr@turingtechnologies.org). It should take you between 5 and 7 hours depending on your experience.
Hope you will have as much fun as we did coding this test!

## Summary

The purpose of the test is to develop a Books backend API system.

## Explanation

Books API should be built upon four basic concepts:

### Volume
A volume represents the data that Books hosts about a book or magazine. It is the primary resource in the Books API. All other resources in this API either contain or annotate a volume.
    
### Bookshelf
A bookshelf is a collection of volumes. Users can create, modify or delete their bookshelves, which are always filled with volumes manually. Bookshelves can be made private or public by the user.

_Example bookshelves_:

"Favorites": {"Harry Potter"}
      
"My eBooks": {"Switch", "Twilight", "The Girl with the Dragon Tattoo"}


### Review: 
A review of a volume is a combination of a star rating and/or text. A user can submit one review per volume. Reviews are also available from outside sources and are attributed appropriately.

### Reading Position
A reading position indicates the last read position in a volume for a user. A user can only have one reading position per volume. If the user has not opened that volume before, then the reading position does not exist. The reading position can store detailed position information down to the resolution of a word. This information is always private to the user. 

## Books API data model

A resource is an individual data entity with a unique identifier. The Books API operates on two types of resources, based on the concepts described above:

- Volume resource: Represents a volume.
- Bookshelf resource: Represents a single bookshelf for a particular user.

The Books API data model is based on groups of resources, called collections:

### Volume collection
The volume collection, is a collection of every volume resource managed by Books API. As such, you cannot list all volume resources, but you can list all volumes that match a set of search terms.

### Bookshelf collection
A bookshelf collection consists of all the bookshelf resources managed by Books API. Bookshelves must always be referenced in the context of a specific user's library. Bookshelves can contain zero or more volumes. 

## Bonus

- Use typescript
- Use NestJS or any other framework like loopback

## Code Submit
Please organize, design, test and document your code as if it were going into production. Fork this repository and send us a pull request. We will review it and get back to you in order to talk about your code! 

__Feel free to apply! Drop us a line with your Linkedin/Github/AnySocialProfileWhereYouAreActive at hr@turingtechnologies.org__

All the best and happy coding.
