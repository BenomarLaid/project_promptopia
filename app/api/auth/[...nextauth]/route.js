
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import User from '@models/user';
// import { connectToDB } from '@utils/database';

// console.log(
//     {clientId: process.env.GOOGLE_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET}
// )
// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         })
//     ],

//     callbacks: {
//         async session({session}){
//             const sessionUser = await User.findOne({
//                 email: session.user.email
//             })
    
//             session.user.id = sessionUser._id.toString();
    
//             return session;
//         },
//         async signIn({profile}) {
//             try {
//                 await connectToDB();
//                 //check if user already existe 
//                 const userExists = await User.findOne({
//                     email: profile.email
//                 });
//                 //if not create user
//                 if(!userExists) {
//                     await User.create({
//                         email: profile.email,
//                         username: profile.name.replace(" ", "").toLowerCase(),
//                         image: profile.picture
//                     })
                    
    
//                 }
//             } catch (error) {
//                 console.log(error);
//                 return false 
//             }
//         },
//     }
    
// })
// //MONGODB_URI=mongodb+srv://benomar20142014:c4SaOnzGuBBSLFyy@cluster0.z86ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }

//70PzCHnWfnliIOHJ