"use client"
import { div } from 'framer-motion/client'
import user from '../../../../../user.json'
const UserInfo = () =>{
    return(
        
        <>
            <div className="flex w-screen justify-center items-center h-screen text-white">
                    <div className="w-full max-w-4xl p-6 bg-gray-900 rounded-2xl shadow-2xl">
                        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">User Details</h1>
                        <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                            <thead className="bg-gray-800">
                            <tr>
                                <th className="border border-gray-700 p-3 text-left font-semibold text-gray-200">Name</th>
                                <th className="border border-gray-700 p-3 text-left font-semibold text-gray-200">Email</th>
                                <th className="border border-gray-700 p-3 text-left font-semibold text-gray-200">College</th>
                            </tr>
                            </thead>

                            <tbody>
                            {user.map((user, index) => (
                                <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                                } hover:bg-gray-700 transition`}
                                >
                                <td className="border border-gray-700 p-3">{user.name}</td>
                                <td className="border border-gray-700 p-3">{user.email}</td>
                                <td className="border border-gray-700 p-3">{user.college}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
            </div>

        </>
    )


}
export default UserInfo