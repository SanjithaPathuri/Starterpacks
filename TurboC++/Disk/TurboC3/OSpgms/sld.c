#include<stdio.h>
void main()
{
	int i=0,j,n,k;
	char a[10],b[10][10],c[20][20],ch;
	printf("enter directory name:");
	scanf("%s",a);
	printf("enter size of directory:");
	scanf("%d",&n);
	printf("enter %d filenames and dates created:\n",n);
	for(j=0;j<n;j++)
	{
		scanf("%s %s",b[j],c[j]);
		for(i=0;i<j;i++)
		{
			if(strcmp(b[j],b[i])==0)
			{
				printf("File already exists\nenter other name:");
				scanf("%s %s",b[j],c[j]);
				break;
			}
		}
	}
	printf("directory\tsize\tfile\tdate\n");
	for(k=0;k<n;k++)	
	{
		printf("%s\t\t%d\t%s\t%s\n",a,n,b[k],c[k]);
	}
}


