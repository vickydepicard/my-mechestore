useEffect(() => {
  fetch('http://localhost:4000/api/orders/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
