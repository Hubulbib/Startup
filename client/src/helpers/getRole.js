export default function getRole(user) {
  if (!user) {
    return 'Пользователь не найден'
  }

  switch (user.role.name) {
    case 'user':
      return 'пользователь';
    case 'mentor':
      return 'ментор';
    case 'admin':
      return 'администратор';
    case 'head':
      return 'суперадмин'
  }
}