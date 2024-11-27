import React from 'react';
import MapComponent from './MapComponent';

const Service = () => {
    const services = [
        {
            icon: '🚴‍♂️',
            title: '24/7 Bike Rentals',
            description: 'Rent bikes at any hour, ensuring flexibility and convenience.'
        },
        {
            icon: '🔧',
            title: 'On-Site Repairs',
            description: 'Quick repairs and maintenance available on the spot.'
        },
        {
            icon: '🗺️',
            title: 'Guided Tours',
            description: 'Explore the city with our friendly guides on guided bike tours.'
        },
        {
            icon: '🏍️',
            title: 'Group Discounts',
            description: 'Special rates for groups to encourage biking together.'
        },
        {
            icon: '💳',
            title: 'Secure Payment Options',
            description: 'Multiple payment methods to ensure your safety and convenience.'
        }
    ];

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8 text-blue-600">Our Services</h2>
                <p className="mb-12 text-gray-700 text-lg">
                    At Acme Bike Rentals, we provide a range of services to enhance your biking experience:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div 
                            key={service.title} 
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                        >
                            <div className="text-6xl mb-4 text-blue-500">{service.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-gray-500">
                    We are dedicated to providing the best biking experience in the city!
                </p>

                {/* Include the map component below */}
                <MapComponent />
            </div>
        </div>
    );
};

export default Service;
