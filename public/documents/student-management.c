#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 100
#define MAX_SUBJECTS 5
#define FILENAME "students.dat"

/* ---------- STRUCTURE ---------- */
typedef struct {
  int id;
  char name[50];
  char course[30];
  int attendance; /* percentage */
  int totalClasses;
  float marks[MAX_SUBJECTS];
  float average;
  char grade;
} Student;

/* ---------- GLOBAL ARRAY (of structures) ---------- */
Student students[MAX_STUDENTS];
int studentCount = 0;

/* ---------- FUNCTION PROTOTYPES ---------- */
int login(void);
void mainMenu(void);
void registerStudent(void);
void studentProfile(void);
void courseManagement(void);
void attendanceManagement(void);

void marksManagement(void);
void exitModule(void);
void loadFromFile(void);
void saveToFile(void);
int searchStudentByID(int id);
void calculateGradeAndAverage(Student *s); /* pointer usage */
void displayStudent(const Student *s);            /* pointer usage */
void displayAllStudents(void);
void clearInputBuffer(void);

/* ---------- MAIN ---------- */
int main(void) {
    loadFromFile();
    if (login()) {
        mainMenu();
    } else {
        printf("\nToo many failed attempts. Exiting...\n");
    }
    return 0;
}

/* ---------- LOGIN MODULE ---------- */
int login(void) {
    char username[20], password[20];
    int attempts = 3;

    printf("===================================\n");
    printf("    STUDENT MANAGEMENT SYSTEM\n");
    printf("===================================\n");
    printf("---------- LOGIN MODULE ----------\n");
    printf("(hint: username 'admin', password 'admin123')\n\n");

    while (attempts > 0) {

        printf("Username: ");
        scanf("%19s", username);
        printf("Password: ");
        scanf("%19s", password);

        if (strcmp(username, "admin") == 0 && strcmp(password, "admin123") == 0)
{
            printf("\nLogin successful! Welcome, %s.\n", username);
            return 1;
        } else {
            attempts--;
            printf("Invalid credentials. Attempts left: %d\n\n", attempts);
        }
    }
    return 0;
}

/* ---------- MAIN MENU (Menu-driven Programming) ---------- */
void mainMenu(void) {
    int choice;

    do {
        printf("\n===================================\n");
        printf("          MAIN MENU\n");
        printf("===================================\n");
        printf("1. Student Registration Module\n");
        printf("2. Student Profile Module\n");
        printf("3. Course Management Module\n");
        printf("4. Attendance Management Module\n");
        printf("5. Marks Management Module\n");
        printf("6. Exit Module\n");
        printf("===================================\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
             clearInputBuffer();
             choice = -1;
        }

        switch (choice) {
             case 1: registerStudent();     break;
             case 2: studentProfile();       break;
             case 3: courseManagement();         break;
             case 4: attendanceManagement(); break;
             case 5: marksManagement();          break;
             case 6: exitModule();         break;
             default: printf("Invalid choice. Please try again.\n");
        }
    } while (choice != 6);
}

/* ---------- STUDENT REGISTRATION MODULE ---------- */
void registerStudent(void) {
    if (studentCount >= MAX_STUDENTS) {
        printf("Student limit reached!\n");
        return;
    }

    Student *s = &students[studentCount]; /* pointer to struct */
    int i;

    clearInputBuffer();
    printf("\n--- STUDENT REGISTRATION ---\n");

    s->id = (studentCount == 0) ? 1001 : students[studentCount - 1].id + 1;
    printf("Assigned Student ID: %d\n", s->id);

    printf("Enter Name: ");
    fgets(s->name, sizeof(s->name), stdin);
    s->name[strcspn(s->name, "\n")] = '\0'; /* string handling: strip newline */

    printf("Enter Course: ");
    fgets(s->course, sizeof(s->course), stdin);
    s->course[strcspn(s->course, "\n")] = '\0';

    s->attendance = 0;
    s->totalClasses = 0;
    for (i = 0; i < MAX_SUBJECTS; i++) s->marks[i] = 0.0f;
    s->average = 0.0f;
    s->grade = 'N';

    studentCount++;
    saveToFile();
    printf("Student registered successfully!\n");
}

/* ---------- STUDENT PROFILE MODULE (uses Searching) ---------- */
void studentProfile(void) {
    int id, index;

    if (studentCount == 0) {
        printf("No students registered yet.\n");
        return;
    }

    printf("\n--- STUDENT PROFILE ---\n");
    printf("Enter Student ID to view (0 to view all): ");
    scanf("%d", &id);

    if (id == 0) {
        displayAllStudents();
        return;
    }

    index = searchStudentByID(id);
    if (index == -1)
        printf("Student not found.\n");
    else
        displayStudent(&students[index]);
}

/* Linear search demonstrating the Searching concept */
int searchStudentByID(int id) {
    int i;
    for (i = 0; i < studentCount; i++) {
        if (students[i].id == id) return i;
    }
    return -1;
}

/* ---------- COURSE MANAGEMENT MODULE ---------- */
void courseManagement(void) {
    int id, index;
    char newCourse[30];

    if (studentCount == 0) {
        printf("No students registered yet.\n");
        return;
    }

    printf("\n--- COURSE MANAGEMENT ---\n");
    printf("Enter Student ID to update course: ");

    scanf("%d", &id);

    index = searchStudentByID(id);
    if (index == -1) {
        printf("Student not found.\n");
        return;
    }

    clearInputBuffer();
    printf("Current Course: %s\n", students[index].course);
    printf("Enter New Course: ");
    fgets(newCourse, sizeof(newCourse), stdin);
    newCourse[strcspn(newCourse, "\n")] = '\0';

    strcpy(students[index].course, newCourse); /* string handling */
    saveToFile();
    printf("Course updated successfully.\n");
}

/* ---------- ATTENDANCE MANAGEMENT MODULE ---------- */
void attendanceManagement(void) {
    int id, index, presentDays, totalDays;

    if (studentCount == 0) {
        printf("No students registered yet.\n");
        return;
    }

    printf("\n--- ATTENDANCE MANAGEMENT ---\n");
    printf("Enter Student ID: ");
    scanf("%d", &id);

    index = searchStudentByID(id);

    if (index == -1) {
         printf("Student not found.\n");
         return;
    }

    printf("Enter total classes held: ");
    scanf("%d", &totalDays);
    printf("Enter classes attended: ");
    scanf("%d", &presentDays);

    students[index].totalClasses = totalDays;
    students[index].attendance = (totalDays > 0) ? (presentDays * 100 / totalDays
) : 0;

    saveToFile();
    printf("Attendance recorded: %d%%\n", students[index].attendance);
    if (students[index].attendance < 75)
         printf("Warning: Attendance is below 75%%!\n");
}

/* ---------- MARKS MANAGEMENT MODULE (uses Sorting) ---------- */
void calculateGradeAndAverage(Student *s) {
    float total = 0;
    int i;

    for (i = 0; i < MAX_SUBJECTS; i++) total += s->marks[i];
    s->average = total / MAX_SUBJECTS;

    if (s->average >= 90)      s->grade = 'A';
    else if (s->average >= 75) s->grade = 'B';
    else if (s->average >= 60) s->grade = 'C';
    else if (s->average >= 40) s->grade = 'D';
    else                 s->grade = 'F';

}

void marksManagement(void) {
    int choice, id, index, i, j;

    if (studentCount == 0) {
        printf("No students registered yet.\n");
        return;
    }

    printf("\n--- MARKS MANAGEMENT ---\n");
    printf("1. Enter/Update Marks\n");
    printf("2. View Ranking (sorted by average)\n");
    printf("Enter choice: ");
    scanf("%d", &choice);

    if (choice == 1) {
        printf("Enter Student ID: ");
        scanf("%d", &id);
        index = searchStudentByID(id);
        if (index == -1) {
            printf("Student not found.\n");
            return;
        }
        for (i = 0; i < MAX_SUBJECTS; i++) {
            printf("Enter marks for subject %d: ", i + 1);
            scanf("%f", &students[index].marks[i]);
        }
        calculateGradeAndAverage(&students[index]);
        saveToFile();
        printf("Marks updated. Average: %.2f, Grade: %c\n",
             students[index].average, students[index].grade);

    } else if (choice == 2) {
        Student temp[MAX_STUDENTS];
        for (i = 0; i < studentCount; i++) temp[i] = students[i];

        /* Bubble sort (descending by average) - Sorting concept */
        for (i = 0; i < studentCount - 1; i++) {
            for (j = 0; j < studentCount - i - 1; j++) {
                if (temp[j].average < temp[j + 1].average) {
                    Student t = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = t;
                }
            }
        }

        printf("\n--- STUDENT RANKING ---\n");
        printf("%-6s%-20s%-10s%-6s\n", "Rank", "Name", "Average", "Grade");
        for (i = 0; i < studentCount; i++) {
            printf("%-6d%-20s%-10.2f%-6c\n", i + 1, temp[i].name, temp[i].average, temp[i].grade);
        }
    } else {
        printf("Invalid choice.\n");
    }
}

/* ---------- DISPLAY HELPERS ---------- */
void displayStudent(const Student *s) {
    printf("\n----------------------------------\n");
    printf("Student ID : %d\n", s->id);
    printf("Name              : %s\n", s->name);
    printf("Course            : %s\n", s->course);
    printf("Attendance : %d%%\n", s->attendance);

    printf("Average Marks: %.2f\n", s->average);
    printf("Grade             : %c\n", s->grade);
    printf("----------------------------------\n");
}

void displayAllStudents(void) {
    int i;
    printf("\n%-6s%-20s%-15s%-12s%-10s%-6s\n",
          "ID", "Name", "Course", "Attendance", "Average", "Grade");
    for (i = 0; i < studentCount; i++) {
        printf("%-6d%-20s%-15s%-12d%-10.2f%-6c\n",
             students[i].id, students[i].name, students[i].course,
             students[i].attendance, students[i].average, students[i].grade);
    }
}

/* ---------- FILE HANDLING ---------- */
void saveToFile(void) {
    FILE *fp = fopen(FILENAME, "wb");
    if (fp == NULL) {
        printf("Error saving data.\n");
        return;
    }
    fwrite(&studentCount, sizeof(int), 1, fp);
    fwrite(students, sizeof(Student), studentCount, fp);
    fclose(fp);
}

void loadFromFile(void) {
    FILE *fp = fopen(FILENAME, "rb");
    if (fp == NULL) return; /* no saved data yet - not an error */
    fread(&studentCount, sizeof(int), 1, fp);
    fread(students, sizeof(Student), studentCount, fp);

    fclose(fp);
}

/* ---------- EXIT MODULE ---------- */
void exitModule(void) {
    saveToFile();
    printf("\nAll data saved. Exiting Student Management System. Goodbye!\n");
}

/* ---------- UTILITY ---------- */
void clearInputBuffer(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

