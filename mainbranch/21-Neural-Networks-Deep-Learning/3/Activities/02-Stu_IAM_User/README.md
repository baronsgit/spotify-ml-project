# Creating Your First IAM Admin User and Group

As a [best practice](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html), you should not use your AWS account root user for any task where it is not required. Instead, you should create a new IAM user for each person that requires administrator access.

To view the tasks that require you to sign in as the root user, see [AWS Tasks that Require Account Root User](https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html).

This procedure describes how to use the _AWS Management Console_ to create an IAM user for yourself and add that user to a group that has administrative permissions from an attached managed policy.

Open the [AWS Management Console](https://console.aws.amazon.com) using your _root_ user and create a new user on IAM as follows:

* Look for the IAM service on the "Find Services" search box, type `iam` and click on `IAM` service.

  ![Create an administrator IAM user - Step 1](Images/iam-user-1.png)

* In the left pane menu, choose the "Users" option and click on the "Add user" button.

  ![Create an administrator IAM user - Step 2](Images/iam-user-2.png)

* On the "Add user" page, provide your new user name in the "User name" input box, then fill out the details of the new `administrator` by filling in the selections as seen below.  Afterwards, click on the "Next: Permissions" button to continue.

  * **User name:** `administrator`
  * **Access type:** Select the "Programmatic access" and "AWS Management Console access" boxes.
  * **Console password:** Choose "Custom password" and type your own password.
  * **Require password reset:** Unselect this box.

  ![Create an administrator IAM user - Step 3](Images/iam-user-3.png)

* On the "Set permissions" page, choose "Add user to group" and click on the "Create group" button.

  ![Create an administrator IAM user - Step 4](Images/iam-user-4.png)

* In the "Create group" dialog box, type `Administrators` in the "Group name" textbox.

* Choose "Filter policies," and then choose "AWS managed - job function" to filter the table contents.

  ![Create an administrator IAM user - Step 5](Images/iam-user-5.png)

* In the policy list, select the checkbox for "AdministratorAccess." Then choose the "Create group" button.

  ![Create an administrator IAM user - Step 6](Images/iam-user-6.png)

* After creating the group, select the checkbox for your new group. Choose "Refresh," if necessary, to see the group on the list.

  ![Create an administrator IAM user - Step 7](Images/iam-user-7.png)

* Click on the "Next: Tags" button to continue.

* On the "Next: Tags" page, leave the defaults and click on the "Next: Review" button to continue.

  ![Create an administrator IAM user - Step 8](Images/iam-user-8.png)

* Review the list of group memberships to be added to the new user. When you are ready to proceed, click on the "Create user" button.

  ![Create an administrator IAM user - Step 9](Images/iam-user-9.png)

* Once you have created the user, download the user's credentials by clicking on the "Download .csv" button. Keep those credentials safe.

  ![Create an administrator IAM user - Step 10](Images/iam-user-10.png)

Enable access to billing data for the IAM admin user as follows:

* On the navigation bar, choose your account name and then choose "My Account."

  ![Create an administrator IAM user - Step 11](Images/iam-user-11.png)

* Scroll down to the "IAM User and Role Access to Billing Information" section and click on the "Edit" option.

  ![Create an administrator IAM user - Step 12](Images/iam-user-12.png)

* Select the checkbox to "Activate IAM Access" and choose "Update."

  ![Create an administrator IAM user - Step 13](Images/iam-user-13.png)

Sign out from your session, open the `CSV` file with the new `administrator` user credentials, and log in to the AWS Management Console using the user's URL and password.

Congratulations! You have created your own admin user.

You can use this same process to create more groups and users and to give your users access to your AWS account resources. To learn about using policies that restrict user permissions to specific AWS resources, see [Access Management](https://docs.aws.amazon.com/IAM/latest/UserGuide/access.html) and [Example IAM Identity-Based Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html). To add additional users to the group after it is created, see [Adding and Removing Users in an IAM Group](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups_manage_add-remove-users.html).

---
© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
