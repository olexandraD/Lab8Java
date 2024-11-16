document.addEventListener('DOMContentLoaded', () => {
    const f = document.getElementById('bookForm');
    const g = document.getElementById('genreSelect');
    const t = document.getElementById('bookTitle');
    const a = document.getElementById('bookAuthor');
    const bl = document.getElementById('bookLists');
    const cBtn = document.getElementById('convertTableBtn');
    const dt = document.getElementById('dataTable');
    const lc = document.getElementById('listContainer');

    const bks = {};
    g.querySelectorAll('option').forEach(opt => bks[opt.value] = []);

    f.addEventListener('submit', e => {
        e.preventDefault();
        addBook();
    });

    a.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addBook();
        }
    });

    function addBook() {
        const genre = g.value;
        const title = t.value.trim();
        const author = a.value.trim();

        if (title && author) {
            bks[genre].push({ title, author });
            updateBookLists();
            t.value = '';
            a.value = '';
        }
    }

    function updateBookLists() {
        bl.innerHTML = '';
        for (const [genre, bkList] of Object.entries(bks)) {
            if (bkList.length) {
                bkList.sort((x, y) => x.title.localeCompare(y.title));
                const genreEl = document.createElement('div');
                genreEl.innerHTML = `<h4>${genre.charAt(0).toUpperCase() + genre.slice(1)}</h4>`;
                const ul = document.createElement('ul');
                bkList.forEach(bk => {
                    const li = document.createElement('li');
                    li.textContent = `"${bk.title}" by ${bk.author}`;
                    ul.appendChild(li);
                });
                genreEl.appendChild(ul);
                bl.appendChild(genreEl);
            }
        }
    }

    cBtn.addEventListener('click', () => {
        const rows = dt.querySelectorAll('tr');
        const ol = document.createElement('ol');

        rows.forEach(row => {
            const li = document.createElement('li');
            const ul = document.createElement('ul');
            row.querySelectorAll('td').forEach(cell => {
                const innerLi = document.createElement('li');
                innerLi.textContent = cell.textContent;
                ul.appendChild(innerLi);
            });
            li.textContent = 'Row'; 
            li.appendChild(ul);
            ol.appendChild(li);
        });

        lc.innerHTML = '';
        lc.appendChild(ol);
        dt.style.display = 'none';
        cBtn.style.display = 'none';
    });
});