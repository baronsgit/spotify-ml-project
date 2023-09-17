# Standardizing and Clustering Currency Data

In this activity, you will use the K-means algorithm to segment global currency and interest rate data. Then, you will evaluate the data by standardizing and segmenting the data into three clusters.

## Background

Almost every country around the world has its own currency and its own interest rate. In global markets, there is not one single interest rate used for borrowing and investing.

This naturally raises the question: Would it be possible to borrow in one currency, where interest rates are low, and invest it in another where interest rates are high? Doing so could yield a **spread**, or a profit difference, between the two interest rates. In fact, this strategy, called a **carry trade**, is common in international finance. [While not without risk](https://en.wikipedia.org/wiki/Carry_(investment)), carry trades can be a profitable way to further diversify an investment portfolio.

## Instructions

1. Read in the `global_carry_trades.csv` into a DataFrame.

2.  Prepare the data using the `StandardScaler` module and the `fit_transform()` function to scale all the columns containing numerical values. Display the first five rows of the scaled data.

3. Create a new DataFrame called `rate_df_scaled` with the "interest_differential" , "next_month_currency_return" columns, and then do the following:

    * Convert the "IMF Country Code" column to variables using `get_dummies` on the original `rate_df` DataFrame. Save these binary variables as a DataFrame called `countries_encoded`.

    * Concatenate the scaled data DataFrame with the encoded variables using `concat`.

    * Save the binary variables as a DataFrame called `countries_encoded`.

    * Add the `countries_encoded` DataFrame to the `rate_df_scaled` DataFrame using the `concat` method, and display the combined DataFrame.

4. Do the following steps to fit the model and then use K-means to segment the data into clusters:

    * Using the concatenated DataFrame, cluster the country level data by using the K-means algorithm and a `k` value of `3`.

    * Fit the model for the `rate_df_scaled` DataFrame.

    * Save the predicted model clusters to a new DataFrame.

    * Create a copy of the concatenated DataFrame as `rate_scaled_predictions` and create a new column "CountryCluster" in the `rate_scaled_predictions` DataFrame with the predicted "country_clusters".

5. Do the following steps to plot and analyze the results:

    * Group the saved DataFrame by `CountryCluster` and calculate the average returns.

    * Use `hvplot` to create a scatter plot of `interest_differential` against `next_month_currency_return`, making the plot vary by `CountryCluster`.

    * Based on this plot, which country cluster appears to provide both the highest interest spread and currency return?

##  Bonus

* Use `AgglomerativeClustering`, `BIRCH`, or any number of the [other clustering methods available on scikit-learn](https://scikit-learn.org/stable/modules/clustering.html#overview-of-clustering-methods) and re-estimate clusters on the DataFrame you created in the main part of this activity.

* Increase the cluster count to determine whether there are any smaller, more granular clusters that show the most potential for profit.

## References

* [scikit-learn StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html)

* [scikit-learn preprocessing data](https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler)

* [Pandas concat function](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.concat.html)

* [scikit-learn Python library](https://scikit-learn.org)

—--

© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
