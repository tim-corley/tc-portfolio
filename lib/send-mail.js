import axios from 'axios'

export const sendMail = async (name, email, message) => {
  const data = {
    name,
    email,
    message,
  }

  try {
    const res = await axios({
      method: 'post',
      url: '/api/contact',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
    // console.log(res)
    return res
  } catch (error) {
    return error
  }
}
