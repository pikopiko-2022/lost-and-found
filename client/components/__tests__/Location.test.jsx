import React from 'react'
import Location from '../Location'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation } from '../../apis/location'
import { updateLocation } from '../../actions/location'

jest.mock('../../actions/location')
jest.mock('../../apis/location')
jest.mock('react-redux')

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
useSelector.mockReturnValue('518 Colo')
updateLocation.mockReturnValue('Hello')

describe('<Location />', () => {
  it('click the button and location rendered on page', async () => {
    const mockLocation = [{ formatted_address: '518 Colombo Street' }]
    addLocation.mockImplementation(() => Promise.resolve(mockLocation))
    render(<Location />)
    await userEvent.type(screen.getByLabelText(/location/i), '518 Colo')
    await userEvent.click(screen.getByRole('button', { name: /search/i }))

    expect(addLocation).toHaveBeenCalledWith('518 Colo')
    expect(screen.getByText(/518 Colombo/i)).toBeInTheDocument()
  })

  it('displays and hides button based on state', async () => {
    const mockLocation = [{ formatted_address: '518 Colombo Street' }]
    addLocation.mockImplementation(() => Promise.resolve(mockLocation))
    render(<Location />)
    await userEvent.type(screen.getByLabelText(/location/i), '518 Colo')
    await userEvent.click(screen.getByRole('button', { name: /search/i }))
    await userEvent.click(screen.getByRole('button', { name: /add location/i }))

    expect(fakeDispatch).toHaveBeenCalledWith('Hello')
    expect(
      screen.queryByRole('button', { name: /add location/i })
    ).not.toBeInTheDocument()
    expect(screen.getByLabelText(/location/i)).toBeEmptyDOMElement()
    expect(screen.getByText(/518 Colo/i)).toBeInTheDocument()
  })

  it('catch error', async () => {
    addLocation.mockImplementation(() => Promise.reject(new Error('failure')))
    render(<Location />)
    await userEvent.type(screen.getByLabelText(/location/i), '!')
    await userEvent.click(screen.getByRole('button', { name: /search/i }))

    expect(screen.getByText(/real address/i)).toBeInTheDocument()
  })
})
