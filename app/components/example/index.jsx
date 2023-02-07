/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";

const queryClient = new QueryClient();

const Example = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <ExampleItem />
      </QueryClientProvider>
    );
  }
  
  function ExampleItem() {
    const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
      axios.get(
        "https://api.github.com/repos/tannerlinsley/react-query"
      ).then((res) => res.data)
    );
  
    if (isLoading) return "Loading...";
  
    if (error) return "An error has occurred: " + error.message;
  
    return (
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{" "}
        <strong>✨ {data.stargazers_count}</strong>{" "}
        <strong>🍴 {data.forks_count}</strong>
        <div>{isFetching ? "Updating..." : ""}</div>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </div>
    );
  }

export default Example
