document.querySelectorAll('button[button-delete]').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    if (confirm('Bạn có chắc muốn xóa tour này không?')) {
      fetch(`/admin/tours/delete/${id}`, { 
        method: 'DELETE',
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

// call API delete category

const button_delete_category=document.querySelectorAll("button[button-delete-category]");
if(button_delete_category){
  button_delete_category.forEach(button=>{
    button.addEventListener("click", ()=>{
      const id=button.getAttribute("data-id");
            if(confirm("Bạn có chắc chắn muốn xóa danh mục này chứ")){
              fetch(`/admin/category/delete/${id}`,{
                    method:"DELETE",
                    headers:{ 'Content-Type': 'application/json' }
              })
              .then(data=>{
                   button.closest('tr').remove();
                
              })
            }
    })
  })
}