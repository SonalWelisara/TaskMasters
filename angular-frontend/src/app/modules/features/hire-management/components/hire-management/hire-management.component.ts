import { Component } from '@angular/core';

@Component({
  selector: 'app-hire-management',
  templateUrl: './hire-management.component.html',
  styleUrl: './hire-management.component.scss'
})
export class HireManagementComponent {

  labors: any = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      mobile: "555-1234",
      email: "john.doe@example.com",
      age: 30,
      category: "Software Engineer"
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Elm St",
      mobile: "555-5678",
      email: "jane.smith@example.com",
      age: 25,
      category: "Data Analyst"
    },
    {
      id: 3,
      firstName: "David",
      lastName: "Johnson",
      address: "789 Oak St",
      mobile: "555-91011",
      email: "david.johnson@example.com",
      age: 35,
      category: "Project Manager"
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Brown",
      address: "1011 Pine St",
      mobile: "555-121314",
      email: "emily.brown@example.com",
      age: 28,
      category: "Network Engineer"
    },
    {
      id: 5,
      firstName: "Michael",
      lastName: "Wilson",
      address: "1213 Cedar St",
      mobile: "555-151617",
      email: "michael.wilson@example.com",
      age: 32,
      category: "Human Resources Specialist"
    },
    {
      id: 6,
      firstName: "Sarah",
      lastName: "Taylor",
      address: "1415 Maple St",
      mobile: "555-181920",
      email: "sarah.taylor@example.com",
      age: 27,
      category: "Marketing Manager"
    },
    {
      id: 7,
      firstName: "Christopher",
      lastName: "Martinez",
      address: "1617 Walnut St",
      mobile: "555-212223",
      email: "christopher.martinez@example.com",
      age: 29,
      category: "Graphic Designer"
    },
    {
      id: 8,
      firstName: "Amanda",
      lastName: "Anderson",
      address: "1819 Birch St",
      mobile: "555-242526",
      email: "amanda.anderson@example.com",
      age: 31,
      category: "Accountant"
    },
    {
      id: 9,
      firstName: "Daniel",
      lastName: "Thomas",
      address: "2021 Spruce St",
      mobile: "555-272829",
      email: "daniel.thomas@example.com",
      age: 26,
      category: "Customer Service Representative"
    },
    {
      id: 10,
      firstName: "Jessica",
      lastName: "Garcia",
      address: "2223 Oakwood St",
      mobile: "555-303132",
      email: "jessica.garcia@example.com",
      age: 33,
      category: "Sales Representative"
    }
  ];
  
  categories: string[] = [];
  filteredLabors: any[] = [];

  constructor() {
    this.categories = this.getUniqueCategories();
    this.filteredLabors = this.labors.slice();
  }

  ngAfterViewInit() {
    // After the view has been initialized, apply the initial filtering
    this.filterLabors('');
  }

  getUniqueCategories(): string[] {
    const uniqueCategories = new Set<string>();
    this.labors.forEach((labor: { category: string; }) => uniqueCategories.add(labor.category));
    return Array.from(uniqueCategories);
  }

  onCategorySelected(selectedCategory: string) {
    this.filterLabors(selectedCategory.toLowerCase());
  }

  onInputValueChange(inputValue: string) {
    this.filterLabors(inputValue.toLowerCase());
  }

  private filterLabors(filterValue: string) {
    // Filter labors based on the selected category or input value
    this.filteredLabors = this.labors.filter((labor: { category: string; }) =>
      labor.category.toLowerCase().includes(filterValue)
    );
  }

}
