Feature: Edit user details via API
	As a tester
	I want to edit an existing user
	So that user details can be updated safely

	Background:
		Given the User Directory app is running
		And the database is reset to seed data

	@api @smoke @edit
	Scenario: Update Alice's details successfully
		When I PUT to "/api/users/1" with:
			| firstName | Alicia |
			| lastName  | Johnson |
			| email     | alicia.johnson@example.com |
			| role      | admin |
		Then the response status should be 200
		And the response field "firstName" should equal "Alicia"
		And the response field "lastName" should equal "Johnson"
		And the response field "email" should equal "alicia.johnson@example.com"
		And the response field "role" should equal "admin"
		When I GET "/api/users/1"
		Then the response status should be 200
		And the response field "firstName" should equal "Alicia"
		And the response field "email" should equal "alicia.johnson@example.com"

	@api
	Scenario: Reject editing to a duplicate email
		When I PUT to "/api/users/1" with:
			| firstName | Alice |
			| lastName  | Johnson |
			| email     | bob@example.com |
			| role      | admin |
		Then the response status should be 409
		And the response error should contain "email already exists"

	@api
	Scenario: Reject editing a missing user
		When I PUT to "/api/users/9999" with:
			| firstName | Ghost |
			| lastName  | User |
			| email     | ghost@example.com |
			| role      | user |
		Then the response status should be 404
		And the response error should contain "user not found"