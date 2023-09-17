# Energize Your Stock Clustering

In this activity, the students will use the K-means algorithm and clustering optimization techniques to cluster stocks to determine a portfolio investment strategy. 

## Instructions

1. Run the code that creates a DataFrame from the `tsx-energy-2018.csv` file. 

2. Run the code that scales the `df_stocks` DataFrame and creates a new DataFrame that contains both the scaled and encoded data. 

3. Initialize the K-means model with three clusters and then fit the `df_stocks_scaled` DataFrame to the model. 

4. Predict the clusters and then create a new DataFrame with the predicted clusters. 

5. Create a scatter plot to visualize the "StockCluster" using  "AnnualVariance" as the x-variable and "Annual Return" as the y-variable. 

    * Style your plot using hvPlot’s customization parameters: `hover_cols` and `title`. Refer to [Customization](https://hvplot.holoviz.org/user_guide/Customization.html) in the hvPlot user guide.

6. Now, reduce the number of features to two principal components on the `df_stocks_scaled` DataFrame, and calculate the explained variance ratio that results from the principal component analysis (PCA) data.

7. Use the calculated PCA DataFrame from Step 6 to create a new DataFrame called `df_stocks_pca`, and then add an additional column to the `df_stocks_pca` DataFrame that contains the tickers from the original `df_stocks` DataFrame. 

8. Rerun the K-means algorithm on the `df_stocks_pca` DataFrame and create a scatter plot using the  "StockCluster" and the two principal components for the x- and y-axes. Be sure to style and format your plot.

9. Answer the following question: 

    * After visually analyzing the cluster analysis results, what is the impact of using fewer features to cluster the data using K-Means?

## Bonus.

* Use the elbow method to find the best value for `k` using the PCA data. Use a range from 1 to 11.

* Plot a line chart with all the inertia values computed with the different values of k to visually identify the optimal value for `k`.

* Answer the following question: 
    
    * What is the best value for k when using the PCA data? Does it differ from the best k value found using the original data?

## References

* [scikit-learn PCA](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html)

* [scikit-learn StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html)

* [scikit-learn preprocessing data](https://scikit-learn.org/stable/modules/preprocessing.html#preprocessing-scaler)

* [scikit-learn Python library](https://scikit-learn.org)

* [hvPlot customization](https://hvplot.holoviz.org/user_guide/Customization.html)

—--

© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.

