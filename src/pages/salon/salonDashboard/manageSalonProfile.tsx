// import { useState } from 'react'
// import {
//   faUser,
//   faLock,
//   faCreditCard,
//   faImage,
//   faTrash,
//   faUpload,
//   faGear,
//   faCamera,
// } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   Button,
//   Input,
//   Tabs,
//   Tab,
//   //   Label,
//   //   Textarea,
//   Avatar,
//   Badge,
//   //   Toast,
//   //   useToast,
// } from '@heroui/react' // assuming HeroUI exports all of these
// import { CustomCard } from '../../../components/Cards/CustomCard'

// interface SalonProfile {
//   name: string
//   ownerName: string
//   email: string
//   phone: string
//   address: string
//   description: string
//   avatar: string
// }

// interface PaymentMethod {
//   id: string
//   type: 'stripe' | 'bank' | 'upi'
//   name: string
//   identifier: string
//   status: 'connected' | 'pending' | 'disconnected'
//   isDefault: boolean
// }

// interface SalonImage {
//   id: string
//   url: string
//   title: string
//   isFeatured: boolean
// }

// const mockProfile: SalonProfile = {
//   name: 'Bella Vista Salon & Spa',
//   ownerName: 'Maria Rodriguez',
//   email: 'maria@bellavista.com',
//   phone: '(555) 123-4567',
//   address: '123 Beauty Lane, Style City, SC 12345',
//   description:
//     'Premium salon and spa offering comprehensive beauty and wellness services in a luxurious environment.',
//   avatar: '',
// }

// const mockPaymentMethods: PaymentMethod[] = [
//   {
//     id: '1',
//     type: 'stripe',
//     name: 'Stripe',
//     identifier: 'acct_1234567890',
//     status: 'connected',
//     isDefault: true,
//   },
//   {
//     id: '2',
//     type: 'bank',
//     name: 'Business Bank Account',
//     identifier: '****1234',
//     status: 'connected',
//     isDefault: false,
//   },
// ]

// const mockImages: SalonImage[] = [
//   {
//     id: '1',
//     url: '/placeholder.svg',
//     title: 'Main Reception Area',
//     isFeatured: true,
//   },
//   {
//     id: '2',
//     url: '/placeholder.svg',
//     title: 'Hair Styling Station',
//     isFeatured: false,
//   },
//   {
//     id: '3',
//     url: '/placeholder.svg',
//     title: 'Spa Treatment Room',
//     isFeatured: false,
//   },
// ]

// export function AccountPage() {
//   const [profile, setProfile] = useState(mockProfile)
//   const [selected, setSelected] = useState<string>('photos')
//   //   const [profile, setProfile] = useState<SalonProfile>(mockProfile)
//   const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
//   //   const [images, setImages] = useState<SalonImage[]>(mockImages)
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   })
//   //   const { toast } = useToast()

//   const handleProfileUpdate = () => {
//     // toast({
//     //   title: 'Profile Updated',
//     //   description: 'Your salon profile has been successfully updated.',
//     // })
//   }

//   const handlePasswordChange = () => {
//     // if (passwordData.newPassword !== passwordData.confirmPassword) {
//     //   toast({
//     //     title: 'Error',
//     //     description: 'New passwords do not match.',
//     //     variant: 'destructive',
//     //   })
//     //   return
//     // }
//     // toast({
//     //   title: 'Password Changed',
//     //   description: 'Your password has been successfully updated.',
//     // })
//     // setPasswordData({
//     //   currentPassword: '',
//     //   newPassword: '',
//     //   confirmPassword: '',
//     // })
//   }

//   //   const getPaymentStatusBadge = (status: string) => {
//   //     switch (status) {
//   //       case 'connected':
//   //         return <Badge className='bg-success/10 text-success border-success/20'>Connected</Badge>
//   //       case 'pending':
//   //         return <Badge className='bg-pending/10 text-pending border-pending/20'>Pending</Badge>
//   //       case 'disconnected':
//   //         return (
//   //           <Badge className='bg-muted/10 text-muted-foreground border-muted/20'>Disconnected</Badge>
//   //         )
//   //       default:
//   //         return <Badge variant='solid'>{status}</Badge>
//   //     }
//   //   }

//   //   const setFeaturedImage = (imageId: string) => {
//   //     setImages(
//   //       images.map(img => ({
//   //         ...img,
//   //         isFeatured: img.id === imageId,
//   //       })),
//   //     )
//   //     // toast({
//   //     //   title: 'Featured Image Updated',
//   //     //   description: 'The featured image has been changed.',
//   //     // })
//   //   }

//   //   const deleteImage = (imageId: string) => {
//   //     setImages(images.filter(img => img.id !== imageId))
//   //     // toast({
//   //     //   title: 'Image Deleted',
//   //     //   description: 'The image has been removed from your gallery.',
//   //     // })
//   //   }

//   return (
//     <div className='space-y-6'>
//       <Tabs
//         aria-label='Account'
//         selectedKey={selected}
//         onSelectionChange={key => setSelected(String(key))}
//       >
//         <Tab
//           key='profile'
//           title={
//             <div className='flex items-center space-x-2'>
//               <FontAwesomeIcon icon={faUser} />
//               <span>Profile</span>
//             </div>
//           }
//         >
//           <div className='grid lg:grid-cols-2 gap-4'>
//             <CustomCard title='Salon Profile'>
//               <>
//                 <Avatar
//                   src={profile.avatar || undefined}
//                   fallback={profile.name
//                     .split(' ')
//                     .map(n => n[0])
//                     .join('')}
//                 />
//                 <Input
//                   label='Salon Name'
//                   value={profile.name}
//                   onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
//                 />
//                 {/* other inputs */}
//                 <Button onPress={handleProfileUpdate}>Update Profile</Button>
//               </>
//             </CustomCard>
//             <CustomCard title='Change Password'>
//               <>
//                 <Input
//                   label='Current Password'
//                   type='password'
//                   value={passwordData.currentPassword}
//                   onChange={e =>
//                     setPasswordData(pd => ({
//                       ...pd,
//                       currentPassword: e.target.value,
//                     }))
//                   }
//                 />
//                 {/* new/confirm */}
//                 <Button onClick={handlePasswordChange}>Change Password</Button>
//               </>
//             </CustomCard>
//           </div>
//         </Tab>

//         <Tab
//           key='payments'
//           title={
//             <div className='flex items-center space-x-2'>
//               <FontAwesomeIcon icon={faCreditCard} />
//               <span>Payments</span>
//             </div>
//           }
//         >
//           <div className='space-y-4'>
//             <CustomCard
//               title='Payment Methods'
//               icon={<FontAwesomeIcon icon={faCreditCard} />}
//               footer={
//                 <Button variant='solid'>
//                   <FontAwesomeIcon icon={faGear} /> Settings
//                 </Button>
//               }
//             >
//               <>
//                 {paymentMethods.map(m => (
//                   <div
//                     key={m.id}
//                     style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}
//                   >
//                     <div>
//                       <p>{m.name}</p>
//                       <p>{m.identifier}</p>
//                     </div>
//                     <div>
//                       <Badge>{m.status}</Badge>
//                       {m.isDefault && <Badge variant='solid'>Default</Badge>}
//                     </div>
//                   </div>
//                 ))}
//               </>
//             </CustomCard>

//             <CustomCard icon={<FontAwesomeIcon icon={faGear} />} title='Payout Settings'>
//               {/* Payout info and button */}
//             </CustomCard>

//             <CustomCard icon={<FontAwesomeIcon icon={faCreditCard} />} title='Recent Payments'>
//               {/* <Table aria-label='Past Payments'>
//                 <TableHeader>
//                   {['Date', 'Customer', 'Amount', 'Status'].map(col => (
//                     <TableColumn key={col}>{col}</TableColumn>
//                   ))}
//                 </TableHeader>
//                 <TableBody items={paymentHistory} emptyContent='No payments'>
//                   {row => (
//                     <TableRow key={row.date + row.customer}>
//                       <TableCell>{row.date}</TableCell>
//                       <TableCell>{row.customer}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>
//                         <Badge>{row.status}</Badge>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table> */}
//             </CustomCard>
//           </div>
//         </Tab>

//         <Tab key='gallery' title='gallery'>
//           <FontAwesomeIcon icon={faImage} /> Gallery
//           <CustomCard
//             icon={<FontAwesomeIcon icon={faImage} />}
//             title='Salon Gallery'
//             footer={
//               <Button variant='solid'>
//                 <FontAwesomeIcon icon={faUpload} /> Upload Photo
//               </Button>
//             }
//           >
//             {/* <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
//               {images.map(img => (
//                 <div key={img.id} className='relative group'>
//                   <img src={img.url} alt={img.title} className='rounded-lg' />
//                   <div className='group-hover:flex hidden absolute inset-0 items-center justify-center gap-2'>
//                     <Button
//                       size='sm'
//                       disabled={img.isFeatured}
//                       onClick={() => setFeaturedImage(img.id)}
//                     >
//                       {img.isFeatured ? 'Featured' : 'Set Featured'}
//                     </Button>
//                     <Button size='sm' variant='destructive' onClick={() => deleteImage(img.id)}>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </Button>
//                   </div>
//                   <p className='mt-2'>{img.title}</p>
//                   {img.isFeatured && <Badge variant='primary'>Featured</Badge>}
//                 </div>
//               ))}
//             </div> */}
//           </CustomCard>
//         </Tab>
//       </Tabs>
//     </div>
//   )
// }
