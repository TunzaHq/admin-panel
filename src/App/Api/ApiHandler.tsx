export const makeGetRequest = async (apiUrl: string, headers?: any): Promise<any | string> => {
    // This method is used to make get requests.
    try {
        const apiResponse = await fetch(apiUrl,
            {
                headers: {
                    ...headers,
                }
            }
        )
        const data = await apiResponse.json()
        return data
    } catch (error: any) {
        if (error) {
            return error.message;
        }
    }
}

export const makePostRequest = async (apiUrl: string, body: any, headers?: any): Promise<any | string> => {
    // This method is used to make post requests.
    try {
        const apiResponse = await fetch(
            apiUrl,
            {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }
        )
        const data = await apiResponse.json()
        return data
    } catch (error: any) {
        if (error) {
            return error.message;
        }
    }
}

export const makePutRequest = async (apiUrl: string, body: any, headers?: any): Promise<any | string> => {
    // This method is used to make put requests.
    try {
        const apiResponse = await fetch(
            apiUrl,
            {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }
        )
        const data = await apiResponse.json()
        return data
    } catch (error: any) {
        if (error) {
            return error.message;
        }
    }
}

export const makeDeleteRequest = async (apiUrl: string, headers?: any): Promise<any | string> => {
    try {
      const apiResponse = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
      });
      const data = await apiResponse.json();
      return data;
    } catch (error: any) {
      if (error) {
        return error.message;
      }
    }
  };
