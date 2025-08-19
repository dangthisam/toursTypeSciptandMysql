document.querySelectorAll('button[button-delete]').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    if (confirm('Bạn có chắc muốn xóa tour này không?')) {
      fetch(`/admin/tours/delete/${id}`, { method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
       })
        .then(response => {
          if (!response.ok) throw new Error('Xóa thất bại');
          return response.json();
        })
        .then(data => {
         
          // Xóa luôn dòng tương ứng trên UI
          button.closest('tr').remove();
        })
        .catch(err => {
          console.error(err);
          alert('Lỗi khi xóa tour');
        });
    }
  });
});
