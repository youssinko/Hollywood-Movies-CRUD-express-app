const React = require('react')
const DefaultLayout = require('./Default')
class Index extends React.Component {
    render() {
        return (
            <DefaultLayout title="Index">
            <div>
               <a href='/user/signup'><button>Sign Up</button></a>
               <a href='/user/login'><button>Log In</button></a>
            </div>
            </DefaultLayout>
        )
    }
}
module.exports = Index