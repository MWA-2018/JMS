# Final Project Workload Details

## David Roncancio
### Server Part
- Server setup, and code organization
- Server typescript compilation and deployment
- MLab setup con Mongo/Mongoose configuration
- Login, Register endpoints
- JWT generation
- JWT validation and isAuthenticated Middleware
- Server Deployment (now)
### Client Part
- Navigation Bar
- Login/Register forms
- JWT storage
- Client Routing
- Client Security [Guards]
- Client Deployment (github pages)
- Credentials state via Redux

## Jeewan Kadangamage
### Server Part
- Applicant Related Information fetching.
- Creating/Updating applicant information.
### Client Part
- Client setup and organizing the code.
- Setting up data service with unidirectional data flow pattern(Redux)
- Applicant Information Component.
- Applicant's applied job component.
- Applicant's information update component.

## Rupendra MAHARJAN
### Server Part
#### RecruiterController
	/api/recruiter/info
	    * Created on April 25, 2018
	    * Uses the middleware created byDavid   for authentication
	    * Uses the JWT created by David
	    * Uses async and await functionfor  operation
	    * Gets the recruiter informationbased   on the credentials from JWT
	/api/recruiter/update
	    * Created on April 25, 2018
	    * Updates the recruiter based on his Object ID.
#### JobPositionController
	/api/jobPositions/create
	    * Created on : April 25, 2018
	    * Creates the new job posted by a particular recruiter
	    * Then saves the job position to the recruiter in an array format
#### Model
	JobPosition And Recruiter
	    * Recruiter Model uses Job Position as nested schema

### Client Part
#### Models: 
	Recruiter
	    * Created on: April 24, 2018
	    * Defines the property of recruiter
	    * Located inside Recruiter folder with the name recruiter.ts
	JobPosition
	    * Created on: April 24, 2018
	    * Replicates the model for the job position of real world.
	    * Located inside the shared folder named jobPosition.ts
#### Services :
	getJobPosition()	
	    * Created on: April 25, 2018
	    * Uses the redux concept developed by Jeewan 
	    * Returns the job positions posted by a recruiter
	    * Redux Technology Used
	createNewJob()		
	    * Created on: April 24, 2018
	    * Creates a new Job position created by the recruiter
	getRecruiterInfo()
	    * Created on April 25, 2018
	    * Uses the redux concept developed by Jeewan
	    * Retrieves the Recruiter Info based on his credentials
	    * Credentials are fetched at the server side
	createRecruiter(newRecruiter)
	    * Created on April 25, 2018
	    * @param newRecruiter : represents a new recruiter 
	    * Deprecated: Use updateRecruiter Instead
	updateRecruiter(updatedRecruiter)
	    * Created on: April 26, 2018
	    * @param updatedRecruiter : represents the updatedRecruiter informations
	    * Updates the user info based on Recruiter credentials
#### Views/Components	
	publish-job
	    * Created on April 24, 2018
	    * Receives the input from the recruiters for new job positions
	recruiter-info
	    * Created on: April 24, 2016
	    * Uses the design created by Jeewan
	    * Gets the recruiter information on update
	recruiter-positions
	    * Created on : April 24, 2018
	    * Enhanced and beautified by Jiecheng
	    * View template to get the job positions posted by the recruiter
	update-recruiter
	    *Created on April 25, 2018
	    * Form to fetch the information related to recruiter information on update
        
## Jiecheng Han
### Server Part
- Job position model
- Job position search api
### Client Part
- Job search bar, including style change, search suggestion and key word filtering.
- Job search result dashboard, including job position detail information expand and collapse. 
- Job position apply procedure for applicants.