## Top-level structure ##
A Widget
  * A controller
  * A model
  * A render

The principles are:
  * only the controller controls the access to the model
  * only the render controls the updates to the user interface

## Initialisation of a widget ##
The following tasks need to be done here:
  * hook up the service and the render
  * create a model, passing the specific model definition of a widget to the GenericModel2 interface
  * create a controller, which means, associating the service and the render with the controller
  * initialise the render, connecting the model with the render and setting the canvas to loading stage

The following is optional, depending on the application:
  * create user events, such as "GENESELECTED" or "GENESFOUND"
  * instantiate a user event handler and pass it to the renderer // TODO

## The controller ##
The controller listens to the events sent from the UI, which will lead to the following possible actions:
  * update the model with information such as, query initialised or completed or the query results;
  * invoke the service, to implement the query
  * handles the success and failure of a query

## The service ##
// todo

## The model ##
The model stores the state of the application and the query results as a manipulatable object.

## The render ##
According to the changes to the model, the render fires off different events which will impact on the presentation at the User Interface, i.e., the Web browser.