const CustomerOrder = require('./models/CustomerOrder');
const Workflow = require('./models/Workflow');
const Step = require('./models/Step');
const Rule = require('./models/Rule');
const DashboardConfig = require('./models/DashboardConfig');
const { sequelize } = require('./db');

const seedDatabase = async () => {
  try {
    console.log('Seeding database with sample data...');

    // Sample customer orders with different products and statuses
    const sampleOrders = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0101',
        streetAddress: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
        product: 'Fiber Internet 300 Mbps',
        quantity: 1,
        unitPrice: 79.99,
        status: 'Completed',
        createdBy: 'Mr. Michael Harris'
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@email.com',
        phone: '+1-555-0102',
        streetAddress: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'United States',
        product: '5G Unlimited Mobile Plan',
        quantity: 2,
        unitPrice: 65.00,
        status: 'In progress',
        createdBy: 'Ms. Olivia Carter'
      },
      {
        firstName: 'Mike',
        lastName: 'Davis',
        email: 'mike.davis@email.com',
        phone: '+1-555-0103',
        streetAddress: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60601',
        country: 'United States',
        product: 'Fiber Internet 1 Gbps',
        quantity: 1,
        unitPrice: 129.99,
        status: 'Completed',
        createdBy: 'Mr. Ryan Cooper'
      },
      {
        firstName: 'Emily',
        lastName: 'Brown',
        email: 'emily.b@email.com',
        phone: '+1-555-0104',
        streetAddress: '321 Elm St',
        city: 'Houston',
        state: 'TX',
        postalCode: '77001',
        country: 'United States',
        product: 'Business Internet 500 Mbps',
        quantity: 1,
        unitPrice: 149.99,
        status: 'Pending',
        createdBy: 'Mr. Lucas Martin'
      },
      {
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.w@email.com',
        phone: '+1-555-0105',
        streetAddress: '654 Maple Dr',
        city: 'Phoenix',
        state: 'AZ',
        postalCode: '85001',
        country: 'United States',
        product: 'VoIP Corporate Package',
        quantity: 3,
        unitPrice: 89.99,
        status: 'Completed',
        createdBy: 'Mr. Michael Harris'
      },
      {
        firstName: 'Lisa',
        lastName: 'Garcia',
        email: 'lisa.g@email.com',
        phone: '+1-555-0106',
        streetAddress: '987 Cedar Ln',
        city: 'Philadelphia',
        state: 'PA',
        postalCode: '19101',
        country: 'United States',
        product: 'Fiber Internet 300 Mbps',
        quantity: 2,
        unitPrice: 79.99,
        status: 'In progress',
        createdBy: 'Ms. Olivia Carter'
      },
      {
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.m@email.com',
        phone: '+1-555-0107',
        streetAddress: '147 Birch St',
        city: 'San Antonio',
        state: 'TX',
        postalCode: '78201',
        country: 'United States',
        product: '5G Unlimited Mobile Plan',
        quantity: 1,
        unitPrice: 65.00,
        status: 'Completed',
        createdBy: 'Mr. Ryan Cooper'
      },
      {
        firstName: 'Jennifer',
        lastName: 'Martinez',
        email: 'jennifer.m@email.com',
        phone: '+1-555-0108',
        streetAddress: '258 Spruce Ave',
        city: 'San Diego',
        state: 'CA',
        postalCode: '92101',
        country: 'United States',
        product: 'Business Internet 500 Mbps',
        quantity: 1,
        unitPrice: 149.99,
        status: 'Pending',
        createdBy: 'Mr. Lucas Martin'
      }
    ];

    // Insert sample orders
    for (const orderData of sampleOrders) {
      await CustomerOrder.create(orderData);
    }
    console.log('✅ Sample customer orders added');

    // Create a sample workflow for order approval
    const workflow = await Workflow.create({
      name: 'Order Approval Workflow',
      version: 1,
      isActive: true,
      inputSchema: {
        type: 'object',
        properties: {
          orderAmount: { type: 'number' },
          customerType: { type: 'string' }
        }
      },
      startStepId: null // Will set after creating steps
    });

    // Create steps
    const reviewStep = await Step.create({
      workflowId: workflow.id,
      name: 'Review Order',
      type: 'Approval',
      order: 1
    });

    const approvalStep = await Step.create({
      workflowId: workflow.id,
      name: 'Manager Approval',
      type: 'Approval',
      order: 2
    });

    const fulfillmentStep = await Step.create({
      workflowId: workflow.id,
      name: 'Order Fulfillment',
      type: 'Task',
      order: 3
    });

    // Update workflow start step
    await workflow.update({ startStepId: reviewStep.id });

    // Create rules
    await Rule.create({
      stepId: reviewStep.id,
      condition: { field: 'totalAmount', operator: '<', value: 100 },
      nextStepId: fulfillmentStep.id,
      priority: 1,
      isDefault: false
    });

    await Rule.create({
      stepId: reviewStep.id,
      condition: { field: 'totalAmount', operator: '>=', value: 100 },
      nextStepId: approvalStep.id,
      priority: 2,
      isDefault: false
    });

    await Rule.create({
      stepId: approvalStep.id,
      condition: null, // Always proceed to fulfillment
      nextStepId: fulfillmentStep.id,
      priority: 1,
      isDefault: true
    });

    console.log('✅ Sample workflow created');

    // Create default dashboard configuration with sample widgets
    let dashboardConfig = await DashboardConfig.findOne();
    console.log('Existing dashboard found:', !!dashboardConfig);
    if (dashboardConfig) {
      console.log('Updating existing dashboard...');
      // Update existing dashboard
      await dashboardConfig.update({
        name: 'Main Dashboard',
        dateFilter: 'All time',
        layout: {
          lg: [
            { i: 'kpi-total-revenue', x: 0, y: 0, w: 3, h: 2 },
            { i: 'kpi-total-orders', x: 3, y: 0, w: 3, h: 2 },
            { i: 'kpi-avg-order', x: 6, y: 0, w: 3, h: 2 },
            { i: 'pie-product-distribution', x: 9, y: 0, w: 3, h: 4 },
            { i: 'bar-revenue-by-product', x: 0, y: 2, w: 6, h: 4 },
            { i: 'bar-orders-by-status', x: 6, y: 4, w: 6, h: 4 }
          ],
          md: [
            { i: 'kpi-total-revenue', x: 0, y: 0, w: 4, h: 2 },
            { i: 'kpi-total-orders', x: 4, y: 0, w: 4, h: 2 },
            { i: 'kpi-avg-order', x: 0, y: 2, w: 4, h: 2 },
            { i: 'pie-product-distribution', x: 4, y: 2, w: 4, h: 4 },
            { i: 'bar-revenue-by-product', x: 0, y: 4, w: 8, h: 4 }
          ],
          sm: [
            { i: 'kpi-total-revenue', x: 0, y: 0, w: 4, h: 2 },
            { i: 'kpi-total-orders', x: 0, y: 2, w: 4, h: 2 },
            { i: 'kpi-avg-order', x: 0, y: 4, w: 4, h: 2 },
            { i: 'pie-product-distribution', x: 0, y: 6, w: 4, h: 4 }
          ]
        },
        widgets: [
          {
            id: 'kpi-total-revenue',
            type: 'KPI',
            config: {
              title: 'Total Revenue',
              description: 'Sum of all order amounts',
              widthCols: 3,
              heightRows: 2,
              metric: 'totalAmount',
              aggregation: 'Sum',
              format: 'Currency',
              precision: 2
            }
          },
          {
            id: 'kpi-total-orders',
            type: 'KPI',
            config: {
              title: 'Total Orders',
              description: 'Number of customer orders',
              widthCols: 3,
              heightRows: 2,
              metric: 'id',
              aggregation: 'Count',
              format: 'Number',
              precision: 0
            }
          },
          {
            id: 'kpi-avg-order',
            type: 'KPI',
            config: {
              title: 'Average Order Value',
              description: 'Average order amount',
              widthCols: 3,
              heightRows: 2,
              metric: 'totalAmount',
              aggregation: 'Average',
              format: 'Currency',
              precision: 2
            }
          },
          {
            id: 'pie-product-distribution',
            type: 'Pie chart',
            config: {
              title: 'Revenue by Product',
              description: 'Product revenue distribution',
              widthCols: 3,
              heightRows: 4,
              chartType: 'Pie chart',
              chartData: 'product',
              yAxis: 'totalAmount',
              aggregation: 'Sum',
              chartColor: '#4f46e5',
              showDataLabel: true,
              showLegend: true
            }
          },
          {
            id: 'bar-revenue-by-product',
            type: 'Bar chart',
            config: {
              title: 'Revenue by Product',
              description: 'Bar chart showing revenue per product',
              widthCols: 6,
              heightRows: 4,
              chartType: 'Bar chart',
              xAxis: 'product',
              yAxis: 'totalAmount',
              aggregation: 'Sum',
              chartColor: '#10b981',
              showDataLabel: false,
              showLegend: false
            }
          },
          {
            id: 'bar-orders-by-status',
            type: 'Bar chart',
            config: {
              title: 'Orders by Status',
              description: 'Order status distribution',
              widthCols: 6,
              heightRows: 4,
              chartType: 'Bar chart',
              xAxis: 'status',
              yAxis: 'id',
              aggregation: 'Count',
              chartColor: '#f59e0b',
              showDataLabel: true,
              showLegend: false
            }
          }
        ]
      });
      console.log('Dashboard updated successfully');
    } else {
      console.log('Creating new dashboard...');
      // Create new dashboard
      dashboardConfig = await DashboardConfig.create({
        name: 'Main Dashboard',
        dateFilter: 'All time',
        layout: {
          lg: [
            { i: 'kpi-total-revenue', x: 0, y: 0, w: 3, h: 2 },
            { i: 'kpi-total-orders', x: 3, y: 0, w: 3, h: 2 },
            { i: 'kpi-avg-order', x: 6, y: 0, w: 3, h: 2 },
            { i: 'pie-product-distribution', x: 9, y: 0, w: 3, h: 4 },
            { i: 'bar-revenue-by-product', x: 0, y: 2, w: 6, h: 4 },
            { i: 'bar-orders-by-status', x: 6, y: 4, w: 6, h: 4 }
          ],
          md: [
            { i: 'kpi-total-revenue', x: 0, y: 0, w: 4, h: 2 },
            { i: 'kpi-total-orders', x: 4, y: 0, w: 4, h: 2 },
            { i: 'kpi-avg-order', x: 0, y: 2, w: 4, h: 2 },
            { i: 'pie-product-distribution', x: 4, y: 2, w: 4, h: 4 },
            { i: 'bar-revenue-by-product', x: 0, y: 4, w: 8, h: 4 }
          ],
          sm: [
            { i: 'kpi-total-revenue', x: 0, y: 0, w: 4, h: 2 },
            { i: 'kpi-total-orders', x: 0, y: 2, w: 4, h: 2 },
            { i: 'kpi-avg-order', x: 0, y: 4, w: 4, h: 2 },
            { i: 'pie-product-distribution', x: 0, y: 6, w: 4, h: 4 }
          ]
        },
        widgets: [
          {
            id: 'kpi-total-revenue',
            type: 'KPI',
            config: {
              title: 'Total Revenue',
              description: 'Sum of all order amounts',
              widthCols: 3,
              heightRows: 2,
              metric: 'totalAmount',
              aggregation: 'Sum',
              format: 'Currency',
              precision: 2
            }
          },
          {
            id: 'kpi-total-orders',
            type: 'KPI',
            config: {
              title: 'Total Orders',
              description: 'Number of customer orders',
              widthCols: 3,
              heightRows: 2,
              metric: 'id',
              aggregation: 'Count',
              format: 'Number',
              precision: 0
            }
          },
          {
            id: 'kpi-avg-order',
            type: 'KPI',
            config: {
              title: 'Average Order Value',
              description: 'Average order amount',
              widthCols: 3,
              heightRows: 2,
              metric: 'totalAmount',
              aggregation: 'Average',
              format: 'Currency',
              precision: 2
            }
          },
          {
            id: 'pie-product-distribution',
            type: 'Pie chart',
            config: {
              title: 'Revenue by Product',
              description: 'Product revenue distribution',
              widthCols: 3,
              heightRows: 4,
              chartType: 'Pie chart',
              chartData: 'product',
              yAxis: 'totalAmount',
              aggregation: 'Sum',
              chartColor: '#4f46e5',
              showDataLabel: true,
              showLegend: true
            }
          },
          {
            id: 'bar-revenue-by-product',
            type: 'Bar chart',
            config: {
              title: 'Revenue by Product',
              description: 'Bar chart showing revenue per product',
              widthCols: 6,
              heightRows: 4,
              chartType: 'Bar chart',
              xAxis: 'product',
              yAxis: 'totalAmount',
              aggregation: 'Sum',
              chartColor: '#10b981',
              showDataLabel: false,
              showLegend: false
            }
          },
          {
            id: 'bar-orders-by-status',
            type: 'Bar chart',
            config: {
              title: 'Orders by Status',
              description: 'Order status distribution',
              widthCols: 6,
              heightRows: 4,
              chartType: 'Bar chart',
              xAxis: 'status',
              yAxis: 'id',
              aggregation: 'Count',
              chartColor: '#f59e0b',
              showDataLabel: true,
              showLegend: false
            }
          }
        ]
      });
      console.log('New dashboard created');
    }

    console.log('✅ Default dashboard configuration created');

    console.log('🎉 Database seeded successfully!');
    console.log('📊 Sample data includes:');
    console.log('   - 8 customer orders with various products and statuses');
    console.log('   - Order approval workflow with conditional rules');
    console.log('   - Pre-configured dashboard with KPIs, pie chart, and bar charts');
    console.log('   - Ready for immediate visualization and analysis');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;