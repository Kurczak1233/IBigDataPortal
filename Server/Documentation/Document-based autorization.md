There is a document based authorization implemented. It requires us to register a handler when we want to use it. (Dependency injection folder in the ResourceBasedAuthorization in Portal.Infrastructure).

It checks if the user has appropriate permissions to do some actions in the system.

In case there is some special need to refactor the structure, or use some commonly used methods, create a new class and register it in the DI.
