package com.jayjain.cibottleneckanalyzer.util;

public class GitHubUrlParser {

    public static RepositoryInfo parse(String url) {

        String cleanUrl =
                url.replace("https://github.com/", "");

        String[] parts = cleanUrl.split("/");

        return new RepositoryInfo(
                parts[0],
                parts[1]
        );
    }
}