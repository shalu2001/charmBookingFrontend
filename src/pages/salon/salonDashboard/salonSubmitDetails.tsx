import React, { useState } from 'react'
import { Form, Input, Button, addToast } from '@heroui/react'
import { submitSalonDetails } from '../../../actions/salonActions'
import { useMutation } from '@tanstack/react-query'
import { SalonDocumentType } from '../../../types/superAdmin'
import { useNavigate } from 'react-router-dom'

export const SalonSubmitDetails = ({ salonId }: { salonId: string }) => {
  const navigate = useNavigate()
  const [details, setDetails] = useState({
    owner_nic: '',
    bank_account_full_name: '',
    bank_account_number: '',
    bank_name: '',
    bank_branch: '',
  })
  const [documents, setDocuments] = useState<{
    [SalonDocumentType.ID_PROOF]?: File
    [SalonDocumentType.BANKING_PROOF]?: File
    [SalonDocumentType.COMPANY_REGISTRATION]?: File
  }>({})

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => submitSalonDetails(formData),
    onSuccess: () => {
      addToast({
        title: 'Success',
        description: 'Salon details submitted successfully!',
        color: 'success',
      })
      navigate('/business/dashboard')
    },
    onError: error => {
      addToast({
        title: 'Error',
        description: 'Failed to submit salon details.',
        color: 'danger',
      })
      console.error(error)
    },
  })

  const handleFileChange = (type: SalonDocumentType, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [type]: file || undefined,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('salonId', salonId)
    Object.entries(details).forEach(([key, value]) => {
      formData.append(key, value)
    })
    Object.entries(documents).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file)
      }
    })
    mutate(formData)
  }

  return (
    <div className='max-w-xl mx-auto mt-0 bg-white p-8 rounded shadow'>
      <h2 className='text-2xl font-semibold mb-6'>Submit Salon Details</h2>
      <Form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <Input
          isRequired
          label='Owner NIC'
          name='owner_nic'
          pattern='[0-9]{9,12}[v,V]?'
          errorMessage='Please enter a valid NIC number'
          value={details.owner_nic}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Account Holder's Full Name"
          name='bank_account_full_name'
          value={details.bank_account_full_name}
          onChange={handleChange}
        />
        <Input
          isRequired
          label='Bank Account Number'
          name='bank_account_number'
          pattern='[0-9]{10,12}'
          errorMessage='Please enter a valid bank account number'
          value={details.bank_account_number}
          onChange={handleChange}
        />
        <Input
          isRequired
          label='Bank Name'
          name='bank_name'
          value={details.bank_name}
          onChange={handleChange}
        />
        <Input
          isRequired
          label='Bank Branch'
          name='bank_branch'
          value={details.bank_branch}
          onChange={handleChange}
        />
        <div>
          <label className='block mb-1 font-medium'>ID Proof (NIC/Passport)</label>
          <Input
            type='file'
            accept='image/*,application/pdf'
            required
            onChange={e =>
              handleFileChange(
                SalonDocumentType.ID_PROOF,
                e.target.files && e.target.files[0] ? e.target.files[0] : null,
              )
            }
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>Banking Proof</label>
          <Input
            type='file'
            accept='image/*,application/pdf'
            required
            onChange={e =>
              handleFileChange(
                SalonDocumentType.BANKING_PROOF,
                e.target.files && e.target.files[0] ? e.target.files[0] : null,
              )
            }
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>Company Registration</label>
          <Input
            type='file'
            accept='image/*,application/pdf'
            required
            onChange={e =>
              handleFileChange(
                SalonDocumentType.COMPANY_REGISTRATION,
                e.target.files && e.target.files[0] ? e.target.files[0] : null,
              )
            }
          />
        </div>
        <Button color='primary' type='submit' isLoading={isPending}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
