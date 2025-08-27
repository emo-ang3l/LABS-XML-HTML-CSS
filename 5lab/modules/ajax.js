export const ajax = {
    _handleResponse(xhr, callback) {
        try {
            console.log('Raw response:', xhr.responseText); // Отладка
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e, 'Response:', xhr.responseText);
            callback(null, xhr.status);
        }
    },

    get(url, callback, retries = 3) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this._handleResponse(xhr, callback);
                } else if (retries > 0) {
                    console.warn(`Retry ${retries} for ${url}`);
                    setTimeout(() => this.get(url, callback, retries - 1), 1000);
                } else {
                    this._handleResponse(xhr, callback);
                }
            }
        };
    },

    post(url, data, callback, retries = 3) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 201 || xhr.status === 200) {
                    this._handleResponse(xhr, callback);
                } else if (retries > 0) {
                    console.warn(`Retry ${retries} for ${url}`);
                    setTimeout(() => this.post(url, data, callback, retries - 1), 1000);
                } else {
                    this._handleResponse(xhr, callback);
                }
            }
        };
    }
};