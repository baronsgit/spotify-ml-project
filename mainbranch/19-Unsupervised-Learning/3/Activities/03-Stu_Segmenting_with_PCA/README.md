# Segmenting with PCA

In this activity, you will use your knowledge of principal component analysis (PCA) to reduce the dimensionality of a customer base dataset. The data has already been segmented based on all of the factors. Use PCA to determine if reducing the dimensionality will improve the results compared to the original DataFrame. 

## Instructions

1. Reduce the dimensionality of the original `customers_transformed_df` DataFrame to two principal components using the following steps: 

    * Import the PCA module from `scikit-learn`.

    * Instantiate the instance of the PCA model by declaring the number of principal components as two.

    * Using the `fit_transform` function from PCA, fit the PCA model to the `customers_transformed_df` DataFrame. Review the first five rows of list data.

2. Using the `explained_variance_ratio_` function from PCA, calculate the percentage of the total variance that is captured by the two PCA variables and answer the following question:

    * What is the explained variance ratio captured by the two PCA variables?

3. Using the `customer_pca` data, create a Pandas DataFrame called `customers_pca_df`. The columns of the DataFrame should be called "PCA1" and "PCA2".

4. Using the `customers_pca_df` DataFrame, use the elbow method to determine the optimal value of k.

5. Segment the `customers_pca_df` DataFrame using the K-means algorithm and the optimal value for k defined in Step 2.

6. Finally, segment the original `customers_transformed_df` DataFrame with all factors by using the K-means algorithm.

7. Answer the following question: 

    * What is the difference between the segmentation results of the PCA DataFrame and the full-factored DataFrame?

---

© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.

