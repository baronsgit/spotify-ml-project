# Tune Up

In this activity, you'll use KerasTuner to optimize the hyperparameters of your deep learning model.

## Instructions:

* Run the starter code provided in Google Colab to create the circles dummy dataset.

* Convert the circles dataset to a dataframe and plot the circles dataset using Pandas.

* Create a method that creates and compiles a new Sequential deep learning model with hyperparameter options. Be sure to include the following features:

  * Allow KerasTuner to select between **ReLU** and **tanh** activation functions for each hidden layer.

  * Allow KerasTuner to decide from 1 to 30 neurons in the first dense layer.

    * **Note:** To limit the tuner runtime, increase your *step* argument to at least 5.

  * Allow KerasTuner to decide from 1 to 5 hidden layers and 1 to 30 neurons in each Dense layer.

* Import the KerasTuner library and create a **Hyperband** tuner instance. Use the following parameters in your tuner:

  * The *objective* is "val_accuracy"

  * *max_epochs* equal to 20

  * *hyperband_iterations* equal to two.

* Run the KerasTuner search for best hyperparameters over 20 epochs.

* Retrieve the top three model hyperparameters from the tuner search and print the values.

* Retrieve the top three models from the tuner search and compare their predictive accuracy against the test dataset.

- - -

© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
