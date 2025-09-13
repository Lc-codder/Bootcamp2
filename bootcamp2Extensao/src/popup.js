const pingBtn = document.getElementById('ping');
const statusEl = document.getElementById('status');
const noteInput = document.getElementById('note');
const saveBtn = document.getElementById('saveNote');

(async function loadNote() {
  try {
    const data = await chrome.storage.local.get(['note']);
    if (data.note) noteInput.value = data.note;
  } catch (err) {
    console.error('Erro ao carregar nota:', err);
  }
})();

pingBtn.addEventListener('click', async () => {
  statusEl.textContent = 'Verificando background...';
  try {
    const res = await chrome.runtime.sendMessage({ type: 'PING' });
    statusEl.textContent = `Background ativo ✅ — ${res.time}`;
  } catch (err) {
    statusEl.textContent = 'Falha ao contatar background ❌';
    console.error(err);
  }
});

saveBtn.addEventListener('click', async () => {
  try {
    await chrome.storage.local.set({ note: noteInput.value });
    statusEl.textContent = 'Nota salva ✅';
  } catch (err) {
    statusEl.textContent = 'Erro ao salvar nota ❌';
    console.error(err);
  }
});
