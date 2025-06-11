const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function updateUserProfile(data, token) {
  const response = await fetch(`${API_URL}/users/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function getUserProfile(id, token) {
  const response = await fetch('http://localhost:3001/users/' + id, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
} 